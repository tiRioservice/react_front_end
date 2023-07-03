export default function Ver({api_version, app_version}) {
    return (
        <>
            <p id="api_version">API: v{api_version}</p>
            <p id="app_version">APP: v{app_version}</p>
        </>
    )
}