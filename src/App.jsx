import { useState, useRef } from 'react'
import EditIcon from './assets/images/edit.png'
import deleteIcon from './assets/images/delete.png'
import './App.css'
import { Edit } from '../components/edit.jsx';

function App() {
  const [todo, setTodo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [modal, showmodal] = useState()

  const validationRef = useRef()

  //to store newly entered task
  const handle = (event) => {
    setNewTask(event.target.value)
  }

  //add new task to the list
  const add = () => {

    //empty input
    if (!newTask) {
      validationRef.current.innerText = 'please add task'
      validationRef.current.style.display = 'block'
      setTimeout(() => {
        validationRef.current.style.display = 'none'

      }, 2000)
      return
    }
    //already exist data
    let isTaskExist = false;
    for (const obj of todo) {
      if (obj.task === newTask) {
        isTaskExist = true;
        break;
      }
    }
    if (isTaskExist) {
      validationRef.current.innerText = 'task already exists'
      validationRef.current.style.display = 'block'

      setTimeout(() => {
        validationRef.current.style.display = 'none'

      }, 2000)
      return
    }

    setTodo([
      ...todo,
      {
        id: todo.length === 0 ? 1 : todo[todo.length - 1].id + 1,
        task: newTask,
        done: false
      }
    ]);
  }

  //delete task
  const deleteTask = (taskid) => {

    setTodo(todo.filter((task) => taskid !== task.id))
  }

  //checking checked or not
  const checked = (taskid) => {
    const updateData = todo.map((task) => {
      if (task.id == taskid) {
        return { ...task, done: !task.done }
      }
      return task;
    })
    setTodo(updateData)
  }
  //show edit modal
  const showEdit = (id) => {
    showmodal(id)
  }
  return (
    <>
      <div className='App'>
        <div className='list'>
          <div className='head'>
            <span className='font'>todo.</span>
          </div>
          <div className='todolist'>
            {modal && <Edit data={modal} setTodo={setTodo} modal={showmodal} />}
            {todo.map((key) => {
              return (<div className='items' key={key.id}>
                <div className='radio'><input className='check' type="checkbox" onChange={() => checked(key.id)} /></div>
                <div className='todo'>
                  <span className='font4' style={{ textDecoration: key.done ? "line-through" : "none" }}>
                    {key.task}
                  </span>
                </div>

                <div className='edit' ><img onClick={() => showEdit(key)} src={EditIcon} alt="" /></div>
                <div className='delete'><img onClick={() => deleteTask(key.id)} src={deleteIcon} alt="" /></div>
              </div>
              )
            })}


          </div>
        </div>
        <div className='add'>
          <div className='addlist'>
            <div className='addinput'>
              <span className='font3'>Code ahead, <br />task drop instead...</span>
              <input type="text" placeholder='type here......' onChange={handle} />
              <span ref={validationRef} style={{ color: "red", display: "none", width: "100%", paddingLeft: "22px" }}></span>

            </div>
            <button className='font2' onClick={add}>Add task</button>
          </div>
        </div>
      </div >

    </>
  )
}

export default App
