/* global localStorage fetch */
const LOCAL_API_URL = 'http://localhost:3000/api'
const REMOTE_API_URL = 'https://ifpi-curso-nodejs-api.herokuapp.com/api'
const HOST = window.location.host;
const API_URL = HOST.includes('netlify.app') ? REMOTE_API_URL : LOCAL_API_URL

const divCourses = document.querySelector('#courses')

function loadUser () {
  const devUser = document.querySelector('.user')
  const user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}
  const userHTML = `<p>${user.name ? user.name : 'Faça login!'}</p>`
  devUser.innerHTML = userHTML
}

async function getCourses () {
  document.get
  try {
    const response = await fetch(`${API_URL}/courses`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
      // credentials: 'include'
    })
    if (response.status === 200) {
      const courses = await response.json()
      fillPage(courses)
    } else {
      console.log(response.status)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  } catch (e) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    console.log(e)
  }
}

function fillPage (courses) {
  if (!courses) {
    return
  }
  courses.forEach(course => {
    const courseHTML = `
    <div class="course">
    <h3>${course.name}</h3>
    <p>Carga horária: ${course.ch} horas</p>
  </div>
    `
    divCourses.innerHTML = divCourses.innerHTML + courseHTML
  })
}

loadUser()
getCourses()
