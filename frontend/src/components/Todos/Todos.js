import React, { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import "./Todos.css";

import ListAltIcon from "@mui/icons-material/ListAlt";

const Todos = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState(false);
  const [buttonText, setButtonText] = useState("Add Todo");
  const [itemId, setItemId] = useState("");

  useEffect(async () => {
    const url = "https://desolate-depths-36701.herokuapp.com//api";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setTodos(data);
  }, []);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    if (buttonText === "Add Todo") {
      try {
        const load = { todo: input };
        const url = "https://desolate-depths-36701.herokuapp.com//api/add";
        const todoItem = await fetch(url, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(load),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setTodos([...todos, await todoItem.json()]);
        setInput("");
        return await todoItem.json();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const load = { todo: input };
        const url = `https://desolate-depths-36701.herokuapp.com//api/${itemId}`;
        const todoItem = await fetch(url, {
          method: "PUT",
          mode: "cors",
          body: JSON.stringify(load),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        // Update UI

        const updatedTodos = todos.filter((todo) => {
          if (todo._id === itemId) {
            return (todo.todo = input);
          }
        });

        setTodos([...todos]);

        console.log(todos);

        setInput("");
        setButtonText("Add Todo");
      } catch (error) {
        console.log(error);
      }
    }

    // if (input === "") {
    //   alert("Please enter a todo");
    // } else {
    //   setTodos([...todos, input]);
    //   setInput("");
    // }
  };
  return (
    <div className="todosContainer">
      <div className="todoBox">
        <div className="todos">
          <ListAltIcon fontSize="large" className="logo" />{" "}
          <h1>Incredible Todo List</h1>
        </div>
        <form>
          <div className="formControls">
            <input
              className="todoInput"
              type="text"
              placeholder="Enter an Incredible Todo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e)} className="add">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
      <div className="todoList">
        <Todo
          setTodos={setTodos}
          todos={todos}
          checked={checked}
          setChecked={setChecked}
          setButtonText={setButtonText}
          setInput={setInput}
          setButtonText={setButtonText}
          setItemId={setItemId}
        />
      </div>
    </div>
  );
};

export default Todos;
