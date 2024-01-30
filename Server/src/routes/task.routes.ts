import express from "express"
import {
    getAll,
    addOne,
    deleteOne,
    editOne,
    editStatus
} from "../controller/task.controller";

const taskRoutes = express.Router()
taskRoutes.get("/",getAll)
taskRoutes.post("/",addOne)
taskRoutes.delete("/:id",deleteOne)
taskRoutes.patch("/:id", editOne);
taskRoutes.patch("/change/:id",editStatus)
export default taskRoutes