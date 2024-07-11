import { useState,useEffect } from 'react'
import Navbar from './assets/components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';

function App() {
  // Aur todo jo hai humara input text hai//
  const [todo, setTodo] = useState("")
  // Todos ek array hai jo ki humare sare todos ko hold karta hai and jo humara todos hoga woh humara array hoga jiske andher humare todos honge//
  const [todos, setTodos] = useState([])

  const [showFinished, setshowFinished] = useState(true)


//localstorage wala function isliye use kiya hai kyuki hum server jabhi restart hoga tho humara data wahi pe store hoke rahega delete nhi hoga//
  useEffect(() => {
   let todoString = localStorage.getItem("todos")
   if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
   }
  }, [])
  
//savetolocalstorage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
    
  }
  



  const handleEdit = (e, id) => {
    let todo = todos.filter(i=>i.id == id)
    setTodo(todo[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS() 

  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{    //filter return the elements of an array//
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS() 

  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS() 

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = ! newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS() 



  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 p-5 m-5 bg-violet-200 rounded-md min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-4 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-600  p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
        </div>
        <input onChange={toggleFinished} className='mx-2' id='show' type="checkbox" checked={showFinished} />
        <label htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black my-2 w-[90%] mx-auto opacity-1'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
              <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950  p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950  p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
