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

  // let taskList = document.querySelector(".task-list")
  let taskName = document.querySelector(".task-name")
  let taskDescription = document.querySelector(".task-description")
  let taskColor = document.querySelector(".task-color")
  let taskDeadline = document.querySelector(".task-time")
  let addNewTask = document.querySelector(".add")

  let divContainer = document.querySelector(".container-right")

  let emptyColCount = 0
  let curDivRow = null

  let divCol
  function addCard() {
    let divRow = document.createElement('div')
    if (emptyColCount == 0) {
      console.log('div', divRow)
      divRow.classList.add('row')
      divContainer.appendChild(divRow)
      console.log('child', divContainer)
      emptyColCount = 3
      curDivRow = divRow
      console.log('curDivRow', curDivRow)
    }
    divCol = document.createElement('div')
    divCol.classList.add('col-4')
    curDivRow.appendChild(divCol)
    emptyColCount -=1
    // createItem(item)
  }

  function INIT() {
    for (const item of tasks) {
      createItem(item)
    }
  }
  function createItem(el) {
    let item = document.createElement('div')
    item.classList.add('container', 'container-item')
    let divRowFirst = document.createElement('div')
    divRowFirst.classList.add('row')
    item.appendChild(divRowFirst)
    divColTask = document.createElement('div')
    divColTask.classList.add('col-10')
    divRowFirst.appendChild(divColTask)
    divColRemove = document.createElement('div')
    divColRemove.classList.add('col-2')
    divRowFirst.appendChild(divColRemove)

    let divRowSecond = document.createElement('div')
    divRowSecond.classList.add('row')
    item.appendChild(divRowSecond)
    divColDesc = document.createElement('div')
    divColDesc.classList.add('col')
    divRowSecond.appendChild(divColDesc)

    let divRowThird = document.createElement('div')
    divRowThird.classList.add('row')
    item.appendChild(divRowThird)
    divColTime = document.createElement('div')
    divColTime.classList.add('col-6', 'offset-6')
    divRowThird.appendChild(divColTime)

    let remove = document.createElement('span')
    let name = document.createElement('span')
    let description = document.createElement('p')
    let time = document.createElement('span')
    
    item.style.backgroundColor = '#' + taskColor.value
    
    name.classList.add('name')
    name.innerHTML = el.taskTitle
    divColTask.appendChild(name)
    remove.innerHTML = "x"
    remove.classList.add('remove')
    divColRemove.appendChild(remove)
    description.classList.add('description')
    description.innerHTML = el.taskContent
    divColDesc.appendChild(description)
    time.classList.add('time')
    time.innerHTML = el.taskTime
    divColTime.appendChild(time)
    divCol.appendChild(item)

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
    addCard()
    taskName.value = ""
    taskDescription.value = ""
  }

  addCard()
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