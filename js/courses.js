const divCursos = document.querySelector('#cursos')

function loadUser () {
  const devUser = document.querySelector('.user')
  const user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}
  const userHTML = `<p>${user.name}</p>`
  devUser.innerHTML = userHTML
}

async function getCourses () {
  try {
    const retorno = await fetch('https://ifpi-curso-nodejs-api.herokuapp.com/api/courses', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
      // credentials: 'include'
    })
    if (retorno.status === 200) {
      const cursos = await retorno.json()
      preencheTela(cursos)
    } else if (retorno.status === 401) {
      console.log('usuário não autenticado')
    }
  } catch (e) {
    console.log(e)
  }
}

function preencheTela (cursos) {
  if (!cursos) {
    console.log('cursos', cursos)
    return
  }
  cursos.forEach(curso => {
    const novoCursoHTML = `
    <div class="curso">
    <h3>${curso.name}</h3>
    <p>Carga horária: ${curso.ch} horas</p>
  </div>
    `
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML
  })
}

loadUser()
getCourses()
