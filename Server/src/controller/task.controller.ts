import { createPool } from "mysql2/promise";
import pool from "../utils/database";
import express, { Request, Response } from "express";
import {
    getAllMysql,
    addOneMysql,
    deleteOneMysql,
    editMysql,
    changeStatus,
} from "../service/task.service";
const taskRoutes = express.Router();

export const getAll = async (req: Request, res:Response) => {
    try {
        const newArr = createPool(pool);
        const result = await getAllMysql();
        // console.log(newArr);
        
        res.status(200).json(result[0]);
    } catch (error) {
        console.log(error);
    }
};
export const addOne = async(req:Request,res:Response)=>{
try {
    // console.log(req.body);
    
    const {id,task,status} = req.body
    const newArr = createPool(pool)
    const result = await addOneMysql(id,task,status)
    res.status(200).json({message:"Thêm thành công"})
} catch (error) {
    console.log(error);
    
}
}
export const deleteOne = async(req:Request,res:Response)=>{
    
    try {
        const id:number = +req.params.id
        const newArr = createPool(pool)
        const result = await deleteOneMysql(id)
        res.status(200).json({message:"Xóa thanh cong"})
    } catch (error) {
        console.log(error)
    }
}
export const editOne = async(req:Request,res:Response)=>{
try {
    const newArr = createPool(pool)

    const id:number = +req.params.id
    const task = req.body.task
    const result = await editMysql(id,task)
    res.status(200).json({message:"Sua thanh cong"})
} catch (error) {
    console.log(error)
}
}
export const editStatus = async(req:Request,res:Response)=>{
    try {
    const newArr = createPool(pool)

        const id:number = +req.params.id
        const status = req.body.status
        // console.log(req.body);
        
        const result = await changeStatus(id,status)
        res.status(200).json({message:"Sua thanh cong"})
    } catch (error) {
        
    }
}