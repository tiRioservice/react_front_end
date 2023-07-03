import { useEffect, useState } from 'react'
import Login from './components/login/Login'
import './components/scss/base_import.scss'
import apiFetchData from './ApiFetchData'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  const [appVersion] = useState("1.0.0")
  const [data, setData] = useState({"data": false})
  const [user, setUser] = useState(undefined)
  const [loggedIn, setLoggedIn] = useState(false)

  const logOut = () => {
    setLoggedIn(false)
    setUser(undefined)
    console.log("logOut")
  }

  useEffect(() => {
    apiFetchData(setData)
  }, [])

  return (
    <>
    {!loggedIn ?
      <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} data={data} setData={setData} appVersion={appVersion} setUser={setUser}/>
      : 
      <div>
        <Dashboard user={user} logOut={logOut}/>
      </div>}
    </>
  )
}

export default App
