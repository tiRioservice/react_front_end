export default function ColabCrud() {
    return {
        insertColab,
        getColabList
    }
}

export async function insertColab(colab_data) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cross-Origin-Opener-Policy": "*",
        },
        body: JSON.stringify(colab_data)
    }

    await fetch("http://18.228.46.50/app/auth/signup", options)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

export async function getColabList(jwt, setAllColabs) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
        },
    }

    await fetch("http://18.228.46.50/app/v2/colaboradores/listar", options)
    .then(res => res.json())
    .then(data => {
        setAllColabs(data)
    })
}