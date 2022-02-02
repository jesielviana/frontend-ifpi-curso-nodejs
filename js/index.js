const loginLogout = document.getElementById('login-logout')

function getUser () {
  return localStorage.getItem('user')
}

function cleanUser () {
  console.log('limpando')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

function init () {
  if (getUser()) {
    loginLogout.innerHTML = 'Logout'
  }
}

loginLogout.onclick = () => {
  if (getUser()) {
    cleanUser()
    loginLogout.innerHTML = 'Login'
  } else {
    window.location.href = '/login.html'
  }
}

init()