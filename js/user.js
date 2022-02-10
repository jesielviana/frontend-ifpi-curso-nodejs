/* global localStorage fetch */
const LOCAL_API_URL = 'http://localhost:3000/api'
const REMOTE_API_URL = 'https://ifpi-curso-nodejs-api.herokuapp.com/api'
const HOST = window.location.host;
const API_URL = HOST.includes('netlify.app') ? REMOTE_API_URL : LOCAL_API_URL


const btnLogin = document.getElementById('login')
const btnSignup = document.getElementById('signup')

if (btnLogin) {
  btnLogin.onclick = () => {
    const login = getDataFromFormLogin()
    sendDataToAPILogin(login)
  }
}

if (btnSignup) {
  btnSignup.onclick = () => {
    const user = getDataFromFormSignup()
    sendDataToAPISignup(user)
  }
}


// Pegar os dados do formulário
function getDataFromFormLogin () {
  const login = {}
  login.email = document.querySelector('#email').value
  login.password = document.querySelector('#password').value
  return login
}
// Enviar os dados para a API
async function sendDataToAPILogin (login) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(login)
  })
  if (response.status === 200) {
    clearForm()
    const data = await response.json()
    const { user, token } = data
    console.log('user', user)
    localStorage.setItem('user', JSON.stringify(user))
    // localStorage.setItem('token', token)
    loadUser()
    const [divMsg] = document.getElementsByClassName('msg')
    divMsg.style.backgroundColor = 'green'
    divMsg.style.color = 'white'
    divMsg.innerHTML = '<p>Login realizado com sucesso!</p>'
    window.location.href = '/index.html'
  }
}



function getDataFromFormSignup () {
  const user = {}
  user.name = document.querySelector('#name').value
  user.email = document.querySelector('#email').value
  user.password = document.querySelector('#password').value
  return user
}

async function sendDataToAPISignup (user) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // credentials: 'include',
    body: JSON.stringify(user)
  })
  const data = await response.json()
  console.log('response.status', response.status)
  console.log('data', data)
  if (response.status === 201) {
    window.location.href = '/login.html'
  }
}


function clearForm () {
  document.querySelector('#email').value = ''
  document.querySelector('#password').value = ''
}

function loadUser () {
  const devUser = document.querySelector('.user')
  const user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}
  const userHTML = `<p>${user.name}</p>`
  devUser.innerHTML = userHTML
}
