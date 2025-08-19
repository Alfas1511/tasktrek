const express = require("express");
const router = express.Router();

// ------------ STATIC DATA -----------
const todosArr = [
    {
        id: 1,
        task: "Task 1",
        tags: ['Node js'],
        status: 'todo',
    },
    {
        id: 2,
        task: "Task 2",
        tags: ['Express js'],
        status: 'doing',
    },
    {
        id: 3,
        task: "Task 3",
        tags: ['JavaScript'],
        status: 'done',
    },
    {
        id: 4,
        task: "Task 4",
        tags: ['React Js'],
        status: 'todo',
    }
]
// ------------------------------------


router.get("/", (req, res) => {
    res.send('This is root url');
});

// ------------------- to get all todos ----------------
router.get("/todos", (req, res) => {
    res.json(todosArr);
});
// -----------------------------------------------------------------------


// ------------------- to get one todo passing id ---------------
router.get("/todos/:id", (req, res) => { // route parameter
    const todoId = parseInt(req.params.id);
    const todo = todosArr.find((item) => item.id === todoId);
    res.json(todo);
});

// router.get("/todos/:id/:status", (req, res) => { // query parameter
//     res.send(req.query);
// });
// -----------------------------------------------------------------------



// ------------------- to create a new todo ---------------
router.post("/todos", (req, res) => {
    const todo = req.body;

    if (!todo.task) {
        return res.status(400).json({ message: "Task is required" });
    }
    if (!todo.tags) {
        return res.status(400).json({ message: "Tags is required" });
    }
    if (!todo.status) {
        return res.status(400).json({ message: "Status is required" });
    }

    // todosArr.push({
    //     id: todosArr[todosArr.length - 1].id + 1,
    //     task: todo.task,
    //     tasgs: todo.tags,
    //     status: todo.status,
    // });

    const newData = {
        id: todosArr[todosArr.length - 1].id + 1,
        task: todo.task,
        tasgs: todo.tags,
        status: todo.status,
    };

    todosArr.push(newData);
    res.status(201).json(todo);
});
// -----------------------------------------------------------------------



// ------------------- to update one todo data passing id ---------------
router.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // const newTodo = req.body;
    const { task, tags, status } = req.body;
    const todoIndex = todosArr.findIndex((item) => item.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo Not Found" });
    }

    if (task) {
        todosArr[todoIndex].task = task;
    }
    if (tags) {
        todosArr[todoIndex].tags = tags;
    }
    if (status) {
        todosArr[todoIndex].status = status;
    }

    res.status(201).json(todosArr);
});
// -----------------------------------------------------------------------


// ------------------- to delete one todo data passing id ---------------
router.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todoIndex = todosArr.findIndex((item) => item.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo Not Found" });
    }

    todosArr.pop(todosArr[todoIndex]);
    return res.status(200).json({ message: "Todo deleted" });
});
// -----------------------------------------------------------------------

module.exports = router;