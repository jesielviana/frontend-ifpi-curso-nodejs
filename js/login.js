/* global fetch */
// Captura o click do botão salvar
const btn = document.getElementById('login')
btn.onclick = () => {
  const login = getDataFromForm()
  sendDataToAPI(login)
}
// Pegar os dados do formulário
function getDataFromForm () {
  const login = {}
  login.email = document.querySelector('#email').value
  login.password = document.querySelector('#password').value
  return login
}
// Enviar os dados para a API
async function sendDataToAPI (login) {
  const resposta = await fetch('https://ifpi-curso-nodejs-api.herokuapp.com/api/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // credentials: 'include',
    body: JSON.stringify(login)
  })
  if (resposta.status === 200) {
    limpaDadosFormulario()
    const data = await resposta.json()
    const { user, token } = data
    console.log('user', user)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    loadUser()
    const [divMsg] = document.getElementsByClassName('msg')
    divMsg.style.backgroundColor = 'green'
    divMsg.style.color = 'white'
    divMsg.innerHTML = '<p>Login realizado com sucesso!</p>'
  }
}

function limpaDadosFormulario () {
  document.querySelector('#email').value = ''
  document.querySelector('#password').value = ''
}

function loadUser () {
  const devUser = document.querySelector('.user')
  const user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}
  const userHTML = `<p>${user.name}</p>`
  devUser.innerHTML = userHTML
}
