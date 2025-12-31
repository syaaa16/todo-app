const input = document.getElementById('input')
  const addTodoBtn = document.getElementById('add')
  const todoList = document.getElementById('list')
  const filterAllBtn = document.getElementById('all')
  const filterCompletedBtn = document.getElementById('completed')
  const filterIncompleteBtn = document.getElementById('incomplete')
  const clearCompleteBtn = document.getElementById('clearComplete')

  let currentFilter = 'all'
  const todos = JSON.parse(localStorage.getItem('todos')) || []

 function renderTodos () {
  todoList.innerHTML = ''

  if (todos.length === 0) {
    const emptyLi = document.createElement('li')
    emptyLi.textContent = 'input tugas terlebih dahulu'
    emptyLi.style.justifyContent = 'center'
    emptyLi.style.color = '#777'
    todoList.appendChild(emptyLi)
    return
  }

  todos.forEach((todo, index) => {
    if (currentFilter === 'completed' && !todo.completed) return
    if (currentFilter === 'incomplete' && todo.completed)return

    const li = document.createElement('li')
    li.textContent = todo.text

    const hapusbtn = document.createElement('button')
    hapusbtn.textContent = 'hapus'
    hapusbtn.classList.add('hapus')

    const centangbtn = document.createElement('button')
    centangbtn.textContent = 'selesai'
    centangbtn.classList.add('selesai')

    const editBtn = document.createElement('button')
    editBtn.textContent = 'edit'
    editBtn.classList.add('edit')

    if (todo.completed) {
      li.style.backgroundColor = '#CBCBCB'
      centangbtn.style.display = 'none'
    }

    centangbtn.addEventListener('click', () => {
      todos[index].completed = true
      localStorage.setItem('todos', JSON.stringify(todos))
      renderTodos()
    })

    editBtn.addEventListener('click', function(){
        const newText = prompt('edit tugas:', todo.text)
        if (newText !== null && newText.trim() !== '') {
            todos[index].text = newText.trim()
            localStorage.setItem('todos', JSON.stringify(todos))
            renderTodos()
        }
    })

    hapusbtn.addEventListener('click', () => {
      todos.splice(index, 1)
      localStorage.setItem('todos', JSON.stringify(todos))
      renderTodos()
    })

    const btnGroup = document.createElement('div')
    btnGroup.classList.add('btn-group')
    btnGroup.appendChild(editBtn)
    btnGroup.appendChild(centangbtn)
    btnGroup.appendChild(hapusbtn)

    li.appendChild(btnGroup)

    todoList.appendChild(li)
  })
}


    filterAllBtn.addEventListener('click', function(){
        currentFilter = 'all'
        renderTodos()
    })
    filterCompletedBtn.addEventListener('click', function(){
        currentFilter = 'completed'
        renderTodos()
    })
    filterIncompleteBtn.addEventListener('click', function(){
        currentFilter = 'incomplete'
        renderTodos()
    })

  addTodoBtn.addEventListener('click', function(){
    if (input.value.trim() !== '') {
      todos.push({
        text : input.value,
        completed : false
      })
      localStorage.setItem('todos', JSON.stringify(todos))
      renderTodos()
      input.value = ''
    }
  })

  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTodoBtn.click()
    }
  })

  clearCompleteBtn.addEventListener('click', function(){
    alert('semua tugas telah ditandai selesai')
    todos.forEach((todo)=> {
        todo.completed = true
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    renderTodos()
  })
  


  renderTodos()
