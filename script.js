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
  let taskDeadline = document.querySelector(".task-time")
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
    
    item.style.backgroundColor = '#' + taskColor.value
    console.log('change color')
    
    name.classList.add('name')
    name.innerHTML = el.taskTitle
    item.appendChild(name)
    remove.innerHTML = "x"
    remove.classList.add('remove')
    item.appendChild(remove)
    description.classList.add('description')
    description.innerHTML = el.taskContent
    item.appendChild(description)
    time.classList.add('time')
    time.innerHTML = el.taskTime
    item.appendChild(time)
    taskList.appendChild(item)

    remove.addEventListener('click', () => {
      removeTask(item)
    })
  }
  
  function removeTask(el) {
    el.parentNode.removeChild(el);
  }


  function createTask() {
    let elem = {
      taskTitle: taskName.value,
      taskContent: taskDescription.value,
      taskTime: taskDeadline.value
    }
    tasks.push(elem)
    createItem(elem)
    taskName.value = ""
    taskDescription.value = ""
  }
  
  INIT()

  addNewTask.addEventListener('click', (e) => {  
      createTask(this.value)
      this.value = ""
      console.log("created")
  })
}

window.addEventListener("DOMContentLoaded", () => {
  $(function () {
    $('#example').datetimepicker()
  })

  addTask()
})