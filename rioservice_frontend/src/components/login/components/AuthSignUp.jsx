export default function authSignUp(e) {
    e.preventDefault()
    fetch("http://18.228.46.50/app/auth/signup")
    .then(res => res.json())
    .then(data => console.log(data))
}