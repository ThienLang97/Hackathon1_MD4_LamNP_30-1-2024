import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./TodoList.scss"
import { AiFillCloseCircle } from "react-icons/ai"; 


const TodoList: React.FunctionComponent = () => {
  let [tasks, setTasks] = useState<TodoList[]>([])
  let [flag, setFlag] = useState(false)
  let [newTask,setNewTask] = useState("")
  let [editMode,setEditMode] = useState<boolean>(false)
  let [editInput,setEditInput] = useState("")
  let [editingId,setEditingId] = useState<number>(0)
  let [status,setStatus] = useState(false)
  const data = async () => {
    const result = await axios.get('http://localhost:3001/')
    setTasks(result.data)
    // console.log(result);

  }
  useEffect(() => {
    data()
  }, [flag])
  //
  let handleDelete = async (item: TodoList) => {
    await axios.delete(`http://localhost:3001/${item.id}`)
    setFlag(!flag)
  }
  let handleAdd = async()=>{
    await axios.post(`http://localhost:3001/`,{task:newTask,status:"not complete"})
    setFlag(!flag)
    setNewTask("")
  }
  let handleFixing = (item:TodoList)=>{
    setEditMode(!editMode)
    setEditingId(item.id)
  }
  let handleEdit = async()=>{
    console.log(editInput);
    await axios.patch(`http://localhost:3001/${editingId}`,{task:editInput})
    setFlag(!flag)
    setEditMode(!editMode)
    setEditInput("")
  }
  let changeStatus = async(item:TodoList)=>{
let newStatus = "complete"
await axios.patch(`http://localhost:3001/change/${item.id}`,{status:newStatus})
console.log(newStatus);

setFlag(!flag)
  }
  return (
    <><div className='inputt'>
      <input type="text" onChange={(e)=>setNewTask(e.target.value)} />
      <button onClick={handleAdd}>Thêm</button>
    </div>
      <table>
        <thead>
          <tr>
            <th>Box</th>
            <th>ID</th>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => {
            return <tr>
              <td>
                <input type="checkbox" onChange={() => changeStatus(item)} />
              </td>
              <td>{item.id}</td>
              {item.status == "not complete" ? <td>{item.task}</td> : <td style={{ textDecoration: "line-through" }}>{item.task}</td>}
              <td>{item.status}</td>
              <td>
                <button onClick={() => handleFixing(item)}>Sửa</button>
                <button onClick={() => handleDelete(item)}>Xóa</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
      {editMode ? (
        <div className='FixingModalWrapper'>
          <div className='FixingModal'>
            <input type="text" value={editInput} onChange={(e) => setEditInput(e.target.value)} />
            <button onClick={handleEdit}>Save</button>
            <AiFillCloseCircle onClick={() => setEditMode(!editMode)} style={{ cursor: "pointer" }} />
          </div>
        </div>
      ) : null}
    </>
  )
};

export default TodoList;
