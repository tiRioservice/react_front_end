import readXlsxFile from 'read-excel-file';
import EndCrud from '../../common/EndCrud';
import ColabCrud from './ColabCrud';
const options = {
    method: undefined,
    headers: undefined,
    body: undefined
}

class ExcelFileProcess {
    file = null;
    host = null;
    user = null;
    colabs = 0;
    array = 0;

    constructor(host, user, refresh, setColabInserted){
        this.host = host;
        this.user = user;
        this.refresh = refresh;
        this.setColabInserted = setColabInserted;
    }

    setFile = (file) => {
        this.file = file;
    }

    getFile = () => {
        return this.file;
    }

    setEndId = (end_id) => {
        this.end_id = end_id;
    }

    getEndId = () => {
        return this.end_id;
    }

    processFile = () => {
        readXlsxFile(this.getFile()).then((rows) => {
            this.array = rows.length;
            this.readWithInterval(rows, 500, 1);
        })
    }

    readWithInterval = (array, intervalo, indice) => {
        setTimeout(() => {
            this.setColabRawData(array[indice]);
            
            if (indice < array.length - 1){
                this.readWithInterval(array, intervalo, indice + 1);
            }

        }, intervalo);
    }

    setColabRawData = async (colab) => {
        let temp_end_id = null;
        if (colab[10] != null){
            if(typeof colab[10] == "number"){
                temp_end_id = await this.putAddressFirst(colab[10]);
            }
        }
        
        setTimeout(() => {
            let rawData = {
                "colab_cpf":colab[3],
                "colab_nome":colab[1],
                "colab_matricula":colab[0],
                "colab_login":colab[1].split(' ')[0].toLowerCase(),
                "colab_password":"123456",
                "end_id":temp_end_id
            }

            this.putColab(rawData);
        }, 500);

    }

    async putColab(rawData){
        const colabCrud = new ColabCrud();

        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + this.user["x-JWT"],
            "Host": this.host
        }

        options['method'] = "POST"
        options['body'] = JSON.stringify(rawData)
        let colab_insertion = await colabCrud.insertColabFromExcelFile(options)
        this.colabs += 1;
    }

    async putAddressFirst(CEP){
        let endCrud = new EndCrud();

        options['headers'] = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
            "Authorization": "Bearer " + this.user["x-JWT"],
            "Host": this.host
        }

        const endRawData = {
            "end_tipo": 2,
            "end_cep":CEP,
            "end_numero":null,
            "end_referencia":null
        }

        options['method'] = "POST"
        options['body'] = JSON.stringify(endRawData)
        const data = await endCrud.insertEndFromExcel(options)
        return data.new_end;
    }
}

export default ExcelFileProcess;