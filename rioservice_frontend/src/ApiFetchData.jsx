export default async function apiFetchData(setData, host) {
    await fetch(`http://${host}/app/data`)
    .then(res => res.json())
    .then(data => {
        setData({
            "api_version":data.api_version,
            "api_name":data.api_name,
            "api_description":data.api_description
        })
    })
}