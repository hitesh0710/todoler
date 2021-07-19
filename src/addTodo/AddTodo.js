import React from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import "./AddTodo.css";

function AddTodo({ setForm }) {

    return (
        <div className="addTodo shadow-box-example z-depth-5">
            <Fab color="primary" onClick={() => setForm(true)}>
                <AddIcon >
                </AddIcon>
            </Fab>
        </div >
    );
}

function FormTodo({ addTodo, setForm, showTodo }) {
    const [value, setValue] = React.useState("");
    const handleClose = () => setForm(false);


    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setForm(false);
        setValue("");
    };

    return (
        <div>
            <Modal show={showTodo} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label><b>Add Todo</b></Form.Label>
                            <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
                        </Form.Group>
                        <Button variant="primary mb-2 mt-2" type="submit">
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

function EditTodo({ index, editTodo, showEditTodo, setEditTodo, todo }) {
    const [value, setValue] = React.useState(todo.text);
    const handleClose = () => setEditTodo(false);


    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        editTodo(index, value);
        setEditTodo(false);
        setValue("");
    };

    return (
        <div>
            <Modal show={showEditTodo} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label><b>Edit Todo</b></Form.Label>
                            <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Edit todo" />
                        </Form.Group>
                        <Button variant="primary mb-2 mt-2" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export { AddTodo, FormTodo, EditTodo };