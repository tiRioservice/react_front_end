import { useEffect, useState } from 'react'
import Login from './components/login/Login'
import './components/scss/base_import.scss'
import apiFetchData from './ApiFetchData'
import Dashboard from './components/dashboard/Dashboard'
import authLogout from './components/login/components/AuthLogout'
import version from './components/whatsnew/components/versions'

function App() {
  const [hostWithPortString] = useState("localhost:8000") //IP do servidor = "18.228.46.50" || "localhost:8000"
  const [appVersion, setAppVersion] = useState("0.0.0")
  const [data, setData] = useState({"data": false})
  const [user, setUser] = useState(undefined)
  const [loggedIn, setLoggedIn] = useState(false)

  const logOut = () => {
    authLogout(user["x-JWT"], setLoggedIn, setUser, hostWithPortString)
  }

  useEffect(() => {
    apiFetchData(setData, hostWithPortString)
    setAppVersion(version[version.length - 1].version)
  }, [hostWithPortString])

  return (
    <>
    {!loggedIn ?
      <Login host={hostWithPortString} loggedIn={loggedIn} setLoggedIn={setLoggedIn} data={data} setData={setData} appVersion={appVersion} setUser={setUser}/>
      : 
      <div>
        <Dashboard host={hostWithPortString} user={user} logOut={logOut}/>
      </div>}
    </>
  )
}

export default App
