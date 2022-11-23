//создание узлов вне цикла \|/
const form = document.createElement('form')
const input = document.createElement('input')
const btn = document.createElement('button')
const list = document.createElement('div')
const ul = document.createElement('ul')

btn.textContent = 'press'

form.append(input, btn)
list.append(ul)
document.body.append(form, list)
//css свойства узлов вне цикла \|/

// обработчик для button

async function render() {
  input.value = ''
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const answer = await response.json()
  for (let i = 0; i < answer.length; i++) {
    const li = document.createElement('li')

    const text = document.createElement('div')
    const btnDelete = document.createElement('button')
    const checkbox = document.createElement('input')

    text.textContent = answer[i].title
    btnDelete.textContent = 'X'
    checkbox.type = 'checkbox'

    li.append(checkbox, text, btnDelete)
    ul.append(li)

    btnDelete.addEventListener('click', () => {
      deleteTask(answer[i].id, li)
    })

    checkbox.addEventListener('click', () => {
      checkedTask(answer[i].id, answer[i])
      if (checkbox.checked) {
        text.style.textDecoration = 'line-through'
      } else {
        text.style.textDecoration = 'none'
      }
    })
  }
}
render()

btn.addEventListener('click', (e) => {
  e.preventDefault()
  addTask(input.value)
})

async function addTask(input) {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ title: input, completed: true }),
  })
  if (res.ok) {
    console.log('Пользователь успешно добавлен!')
  }
  const answer = await res.json()
  return console.log(answer)
}

async function deleteTask(id, list) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos${id}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    console.log('Пользователь успешно удален!')
  }
  return list.remove()
}

async function checkedTask(id, list) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ completed: true }),
  })
  if (res.ok) {
    console.log('Пользователь успешно изменен!')
    list.completed = !list.completed
  }
}
