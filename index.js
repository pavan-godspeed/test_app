const express = require("express");
const app = express();
const utils = require("./utils/task-schema");

app.use(express.json());

const tasks = [
    {
        id: 1,
        name: "Task 1",
        completed: false
    },
    {
        id: 2,
        name: "Task 2",
        completed: false
    },
    {
        id: 3,
        name: "Task 3",
        completed: false
    },
];

app.get("/api/tasks/", (request,response)=>{
    response.send(tasks);
});

app.get("/api/task/:id", (request,response)=>{
    const taskId = request.params.id;
    const task = tasks.find(task=>task.id===parseInt(taskId));
    if(!task){
        response.status(404).send("The task with the given ID does not exist.")
    }
    response.status(200).send(task)
})

app.post("/api/task",(request,response)=>{
    const { error } = utils.validateTask(request.body)
    if(error){
        console.log(error)
        return response.status(400).send("The name should be atlease 3 characters");
    }
    const task = {
        id: tasks.length + 1,
        name: request.body.name,
        completed: request.body.completed
    };
    tasks.push(task);
    response.status(201).send(task)
})

module.exports = app.listen(4000,()=>{
    console.log("listening at port:4000");
});
