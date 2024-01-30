import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "../Server/src/routes/task.routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", taskRoutes);
app.use("/:id", taskRoutes);

app.listen(3001, () => {
    console.log("Server đang chạy tại host 3001");
});
