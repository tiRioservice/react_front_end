export default async function apiFetchData(setData) {
    await fetch("http://18.228.46.50/app/data")
    .then(res => res.json())
    .then(data => {
        setData({
            "api_version":data.api_version,
            "api_name":data.api_name,
            "api_description":data.api_description
        })
    })
}