const express = require("express");
const cors = require("cors")
const { connection } = require("./configs/db");
const {userRouter} = require("./Routes/User.Routes")

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({message: "Server and database is connected successfully"})
})


app.use("/api/user", userRouter)


app.listen(8000, async() => {
    try {
        await connection
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
    console.log("Connected to server at port no 8000");
})