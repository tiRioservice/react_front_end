export default async function getEnd(cep, setEnd) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }

    await fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
    .then(res => res.json())
    .then(data => {
        setEnd(data)
    })
}