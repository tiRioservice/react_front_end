export default function passChange(jwt, colab_id, colab_new_password, setFeedbackMessage) {
    const data = {
        colab_id: colab_id,
        colab_password: colab_new_password
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + jwt
        },
        body: JSON.stringify(data)
    }

    fetch("http://18.228.46.50/app/v2/colaboradores/trocar_senha", options)
    .then(res => res.json())
    .then(data => {
        setFeedbackMessage(data.msg)
    })
}