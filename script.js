function addTask() {
  let tasks = [{
    taskTitle: "Task 1",
    taskContent: "go for a walk",
    taskTime: "07.11.2019"
    }, {
    taskTitle: "Task 2",
    taskContent: "feed a cat",
    taskTime: "07.11.2019"
  }]
  let taskList = document.querySelector(".task-list")
  let taskName = document.querySelector(".task-name")
  let taskDescription = document.querySelector(".task-description")
  let taskColor = document.querySelector(".task-color")
  let taskTime = document.querySelector(".task-time")
  let addNewTask = document.querySelector(".add")
  function INIT() {
    for (const item of tasks) {
      createItem(item)
    }
  }
  function createItem(el) {
    let item = document.createElement('li')
    let remove = document.createElement('span')
    let name = document.createElement('span')
    let description = document.createElement('p')
    let time = document.createElement('span')
    remove.innerHTML = "x"
    remove.classList.add('remove')
    remove.addEventListener('click', () => {
      console.log("remove")
      removeTask(this)
    })
    name.classList.add('name')
    name.innerHTML = el.taskTitle
    item.appendChild(name)
    item.appendChild(remove)
    description.classList.add('description')
    description.innerHTML = el.taskContent
    item.appendChild(description)
    time.classList.add('time')
    time.innerHTML = el.taskTime
    item.appendChild(time)
    taskList.appendChild(item)
  }
  
  function removeTask(el) {
    let removeEl = el.parentNode

    removeEl.remove()
    for (const [index, item] of items.entries()) 
        items.splice(index, 1)
  }


  function addTasks(str) {
    let elem = {
        taskContent: str
    }
    tasks.current.push(elem);
    createItem(elem)
    allTasks.innerHTML = tasks.allTasks
  }
  
  INIT()

  addNewTask.addEventListener('click', (e) => {  
      addTasks(this.value);
      this.value = "";
    
  })
}

window.addEventListener("DOMContentLoaded", () => {
  $(function () {
    $('#example').datetimepicker()
  })

  addTask()
})