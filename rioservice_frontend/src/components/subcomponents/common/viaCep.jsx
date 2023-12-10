export default async function getEnd(cep, setEnd=undefined) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Access-Control-Request-Headers": "*"
        },
    }

    try{
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`, options)

        if(!resp){
            throw new Error("Não foi possivel recuperar os dados")
        }

        const data = await resp.json()

        if(setEnd !== undefined && typeof setEnd === "function"){
            setEnd(data)
        } else {
            return data
        }
    }
    catch(e){
        throw new Error(e)
    }
}