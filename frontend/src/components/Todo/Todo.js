import React, { useEffect } from "react";
import "./Todo.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const Todo = ({ setTodos, todos, checked, setChecked, setInput, setButtonText, setItemId }) => {
  const handleCheckbox = (e) => {
    setChecked(!checked);
  };

const handleEdit = (item,id)=>{
  setInput(item)
  setButtonText("Update Todo")
  setItemId(id)
}

  const handleDelete = async (id) => {
    try {
      const url = `https://still-shore-57627.herokuapp.com/api/${id}`;
      const deletedTodo = await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const removedTodo = todos.filter((todo) => todo._id !== id);
      setTodos(removedTodo);
      return deletedTodo.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo">
      <ul className="todoItem">
        {todos.map((todo) => {
          return (
            <div className="todo" key={todo._id}>
              <form>
                <input type="checkbox" onClick={(e) => handleCheckbox(e)} />
              </form>
              <li className={checked && "checked"}>{todo.todo}</li>
              <div>
                <DeleteForeverIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(todo._id)}
                />
                <EditIcon style={{ cursor: "pointer" }} onClick = {()=>handleEdit(todo.todo, todo._id)}/>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
