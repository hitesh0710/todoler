import React from "react";
import "./App.css";
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddTodo, FormTodo, EditTodo } from "./addTodo/AddTodo";
import SearchAppBar from "./appBar/AppBar";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import UndoIcon from '@material-ui/icons/Undo';

function Todo({ todo, index, markTodo, unmarkTodo, removeTodo, setEditTodo, setIndex }) {
  return (
    <div
      className="todo"

    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}><b>{todo.text}</b></span>
      <div>
        <Button variant="outline-primary" onClick={() => { setEditTodo(true); setIndex(index) }}><EditIcon /></Button>{' '}
        {
          !todo.isDone ? (<Button variant="outline-success" onClick={() => markTodo(index)}><DoneIcon /></Button>) :
            (<Button variant="outline-danger" onClick={() => unmarkTodo(index)}><UndoIcon /></Button>)
        }{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}><DeleteIcon /></Button>
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      isDone: false
    }
  ]);
  const [showTodo, setValue] = React.useState(false);
  const [showEditTodo, setEditTodo] = React.useState(false);
  const [cardIndex, setIndex] = React.useState(0);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const editTodo = (index, text) => {
    const newTodos = [...todos];
    newTodos[index].text = text;
    setTodos(newTodos);
    setEditTodo(false);
  };
  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const unmarkTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = false;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const setForm = value => {
    setValue(value);
  };

  return (
    <div className="bg-dark">
      <SearchAppBar setForm={setForm} />
      <div className="app">
        <div className="container">
          <h1 className="text-center mb-4 text-white">Todo List</h1>
          <div>
            <EditTodo index={cardIndex} editTodo={editTodo} showEditTodo={showEditTodo} setEditTodo={setEditTodo} todo={todos[cardIndex]} />
            {todos.map((todo, index) => (
              <div key={index}>
                <Card className={todo.isDone ? "bg-light text-muted" : ""} >
                  <Card.Body>
                    <Todo
                      key={index}
                      index={index}
                      todo={todo}
                      unmarkTodo={unmarkTodo}
                      editTodo={editTodo}
                      markTodo={markTodo}
                      removeTodo={removeTodo}
                      setEditTodo={setEditTodo}
                      setIndex={setIndex}
                    />
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddTodo setForm={setForm}></AddTodo>
      <FormTodo addTodo={addTodo} setForm={setForm} showTodo={showTodo} />
    </div >
  );
}

export default App;
