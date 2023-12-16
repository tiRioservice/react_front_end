import version from "./components/versions";
import "./scss/style.scss";

function WhatsNew(){

    const version_reverse = [...version].reverse();

    const formatMajor = (version) => {
        const majorElements = version.major.map((major) => {
            return(
                <div key={major.number} className="major">
                    🎖 <span>Atualização maior</span> - {major.desc}
                </div>
            )
        })
        return majorElements
    }

    const formatMinor = (version) => {
        const minorElements = version.minor.map((minor) => {
            return(
                <div key={minor.number} className="minor">
                    🥇 <span>Atualização menor</span> - {minor.desc}
                </div>
            )
        })
        return minorElements
    }

    const formatBugfix = (version) => {
        const bugFixElements = version.bugfix.map((fix) => {
            return(
                <div key={fix.number} className="bugfix">
                    🥈 <span>Correção</span> - {fix.desc}
                </div>
            )
        })
        return bugFixElements
    }

    const versionElements = version_reverse.map((version) => {
        return(
            <div key={version.version} className="version">
                <p className="versionNumber"> ⚙️ Ver: 
                    <span>
                        {version.version}
                    </span>
                </p>

                <p className="versionDate">
                    Lançamento:
                    <span>
                        {version.date}
                    </span>
                </p>

                {(version.major != undefined)?(formatMajor(version)):('')}
                {(version.minor != undefined)?(formatMinor(version)):('')}
                {(version.bugfix != undefined)?(formatBugfix(version)):('')}
            </div>
        )
    });

    return(
        <section id="versions">
            <div className="container">
                {versionElements}
            </div>
        </section>
    )
}

export default WhatsNew;