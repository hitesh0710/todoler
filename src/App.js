import React from "react";
import axios from 'axios';
import "./App.css";
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddTodo, FormTodo, EditTodo } from "./addTodo/AddTodo";
import SearchAppBar from "./appBar/AppBar";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import UndoIcon from '@material-ui/icons/Undo';
import Toast from './toast/Toast';
import { snackbar } from './toast/Toast';

const baseURL = 'http://todoler-backend.herokuapp.com';

function Todo({ todo, index, markTodo, unmarkTodo, removeTodo, setEditTodo, setID, _id, setIndex }) {
  return (
    <div
      className="todo"

    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}><b>{todo.text}</b></span>
      <div>
        <Button variant="outline-primary" onClick={() => { setEditTodo(true); setID(_id); setIndex(index) }}><EditIcon /></Button>{' '}
        {
          !todo.isDone ? (<Button variant="outline-success" onClick={() => markTodo(_id, index)}><DoneIcon /></Button>) :
            (<Button variant="outline-danger" onClick={() => unmarkTodo(_id, index)}><UndoIcon /></Button>)
        }{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(_id)}><DeleteIcon /></Button>
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
  ]);
  const [showTodo, setValue] = React.useState(false);
  const [showEditTodo, setEditTodo] = React.useState(false);
  const [cardID, setID] = React.useState('');
  const [cardIndex, setIndex] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);
  const [state, changeState] = React.useState(true);

  React.useEffect(() => {
    axios.get(`${baseURL}/todos`)
      .then(response => {
        setTimeout(() => {
          setTodos(response.data);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        snackbar("error", error);
      })

  }, [isLoading, state]);

  const addTodo = text => {
    const newTodo = {
      text: text,
      isDone: false
    };
    axios.post(`${baseURL}/todos/add`, newTodo)
      .then(res => {
        snackbar("notification", 'Todo added successfully');
        changeState(!state);
      })
      .catch((error) => {
        snackbar("error", error);
      });
  };

  const editTodo = (_id, text, isDone) => {
    const newTodo = {
      text: text,
      isDone: isDone
    };
    axios.post(`${baseURL}/todos/update/${_id}`, newTodo)
      .then(res => {
        snackbar("notification", 'changes saved successfully');
        changeState(!state);
      })
      .catch((error) => {
        snackbar("error", error);
      });
    setEditTodo(false);
  };
  const markTodo = (_id, index) => {

    const newTodo = {
      text: todos[index].text,
      isDone: true
    };
    axios.post(`${baseURL}/todos/update/${_id}`, newTodo)
      .then(res => {
        snackbar("notification", 'changes saved successfully');
        changeState(!state);
      })
      .catch((error) => {
        snackbar("error", error);
      });
  };

  const unmarkTodo = (_id, index) => {
    const newTodo = {
      text: todos[index].text,
      isDone: false
    };
    axios.post(`${baseURL}/todos/update/${_id}`, newTodo)
      .then(res => {
        snackbar("notification", 'changes saved successfully');
        changeState(!state);
      })
      .catch((error) => {
        snackbar("error", error);
      });
  };

  const removeTodo = _id => {
    axios.delete(`${baseURL}/todos/` + _id)
      .then(res => {
        snackbar("notification", 'Todo deleted successfully');
        changeState(!state);
      })
      .catch((error) => {
        snackbar("error", error);
      });
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
            {
              isLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-white" style={{ width: '3rem', height: '3rem' }} role="status">
                  </div>
                </div>) : todos.map((todo, index) => (
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
                          setID={setID}
                          setIndex={setIndex}
                          _id={todo._id}
                        />
                      </Card.Body>
                    </Card>
                  </div>
                ))
            }
            <EditTodo _id={cardID} editTodo={editTodo} showEditTodo={showEditTodo} setEditTodo={setEditTodo} todo={todos[cardIndex]} />
          </div>
        </div>
      </div>
      <AddTodo setForm={setForm}></AddTodo>
      <FormTodo addTodo={addTodo} setForm={setForm} showTodo={showTodo} />
      <Toast />
    </div >
  );
}

export default App;
