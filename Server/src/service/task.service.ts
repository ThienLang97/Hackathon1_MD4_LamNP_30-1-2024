import {createPool} from "mysql2/promise"
import pool from "../utils/database"
export const getAllMysql = ()=>{
    const result = createPool(pool)
    // console.log(result)
    return result.execute("SELECT * FROM todolist")
}
export const addOneMysql = (id:number,task:string,status:string)=>{
    const result = createPool(pool)
const exe = result.execute("INSERT INTO todolist(task,status) VALUES(?,?)",[task,status])
const newT = result.execute("SELECT * FROM todolist")
// console.log(newT);
return newT

}
export const editMysql = (id:number,task:string)=>{
const result = createPool(pool)
console.log(task);

const exe = result.execute("UPDATE todolist SET task = ? WHERE id = ?",[task,id])
}
export const deleteOneMysql = (id:number)=>{
const result = createPool(pool)
return result.execute("DELETE FROM todolist WHERE id = ?",[id])
}
export const changeStatus = (id:number,status:string)=>{
    const result = createPool(pool)
    return result.execute("UPDATE todolist SET status = ? WHERE id = ?",[status,id])
    // console.log(status)
}