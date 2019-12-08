let storedTasks = localStorage.getItem('tasks')
const tasks = JSON.parse(storedTasks)
console.log(tasks)

var myMap = new Map()

let taskName = document.querySelector(".task-name")
let taskDescription = document.querySelector(".task-description")
let taskColor = document.querySelector(".task-color")
let taskDeadline = document.querySelector(".task-time")
let addNewTask = document.querySelector(".add")
let divContainer = document.querySelector(".container-right")

let emptyColCount = 0
let curDivRow = null

let item
let divCol

function addCard(item) {
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
  divCol.appendChild(item)

  divCol.addEventListener('dragover', dragOver)
  divCol.addEventListener('dragenter', dragEnter)
  divCol.addEventListener('dragleave', dragLeave)
  divCol.addEventListener('drop', dragDrop)
}

function createItem(el) {
  item = document.createElement('div')
  item.setAttribute("draggable", "true")
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
  divColTime.classList.add('col-8', 'offset-4')
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
  
  remove.addEventListener('click', () => {
    let item = remove.closest(".container-item")
    console.log('remove', item)
    removeTask(item)
  })

  item.addEventListener('dragstart', dragStart)
  item.addEventListener('dragend', dragEnd)

  return item
}


function removeTask(el) {
  let elem = myMap.get(el)
  myMap.delete(el)
  console.log('elem', elem)
  let index = tasks.indexOf(elem)
  console.log('index', index)
  if (index !== -1) {
    tasks.splice(index, 1)
  }
  el.parentNode.removeChild(el)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


function createTask(elem) {
  const item = createItem(elem)
  myMap.set(item, elem)
  addCard(item)
  taskName.value = ""
  taskDescription.value = ""
}

addNewTask.addEventListener('click', (e) => {  
  let elem = {
    taskTitle: taskName.value,
    taskContent: taskDescription.value,
    taskTime: taskDeadline.value
  }
  tasks.push(elem)
  createTask(elem)
  console.log("created")
  localStorage.setItem('tasks', JSON.stringify(tasks))    
})

// Drag Functions

var dragItem = null

function dragStart() {
  // this - is item, class container-item
  dragItem = this
}

function dragEnd() {
  dragItem = null
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop(e) {
  // this - is col, e.target - this item
  console.log('dragDrop', this, e.target)
  let itemTo = e.target
  let placeTo = this
  let itemFrom = dragItem
  let placeFrom = dragItem.parentNode
  placeTo.removeChild(itemTo)
  placeFrom.removeChild(itemFrom)
  placeTo.appendChild(itemFrom)
  placeFrom.appendChild(itemTo)
}


window.addEventListener("DOMContentLoaded", () => {
  $(function () {
    $('#example').datetimepicker()
  })

  // начальное добавление задач
  for (const item of tasks) {
    console.log('item', item)
    createTask(item)
  } 
})
