/* global localStorage fetch */

const divCourses = document.querySelector('#courses')

function loadUser () {
  const devUser = document.querySelector('.user')
  const user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}
  const userHTML = `<p>${user.name}</p>`
  devUser.innerHTML = userHTML
}

async function getCourses () {
  try {
    const response = await fetch('https://ifpi-curso-nodejs-api.herokuapp.com/api/courses', {
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
    } else if (response.status === 401) {
      console.log('User not authenticated')
    }
  } catch (e) {
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
