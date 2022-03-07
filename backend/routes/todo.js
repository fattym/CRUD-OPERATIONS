const router = require("express").Router();
const Todos = require("../models/todo");



// Add a Todo
router.post("/add", async(req, res) => {
    try {
       const newTodo = new Todos({
           todo:req.body.todo
       })
       const savedTodo = await newTodo.save();
       res.status(201).json(savedTodo)
    } catch (error) {
        res.json(error)
    }
  });

//   Get all Todos
  router.get("/", async(req, res)=>{
try {
    const allTodos = await Todos.find();
    res.status(200).json(allTodos);
} catch (error) {
    res.json(error)
}
  })

//   Update a todo
router.put("/:id", async (req, res)=>{
    const id = req.params.id;
    const updateTodo = await Todos.findByIdAndUpdate(id, {todo:req.body.todo});

    res.status(200).json(updateTodo);
})

//   Delete a todo
router.delete("/:id", async (req, res)=>{
    const id = req.params.id;
    const deletedTodo = await Todos.findByIdAndDelete(id, {todo:req.body.todo});

    res.status(200).json(deletedTodo);
})

module.exports = router;
