import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import "./TodoStyles.scss";
import TodoItem from "../TodoItem";
import AddTodoInput from "../AddTask/AddTaskInput";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //read todos firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //create task
  const addTask = async (event) => {
    event.preventDefault();
    if (inputValue === "") {
      alert("Пожалуйста, введите заголовок задачи :)");
      return;
    }
    await addDoc(collection(db, "todos"), {
      title: inputValue,
      completed: false,
      description: "",
      file: false,
      data: new Date(),
    });
    setInputValue("");
  };

  const inputTask = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  // Update completed task in firebase
  const checkTask = async (task) => {
    await updateDoc(doc(db, "todos", task.id), {
      completed: !task.completed,
    });
  };

  // Delete task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="mainContainer">
      <div className="title">ToDo</div>

      <AddTodoInput
        addTask={addTask}
        inputTask={inputTask}
        inputValue={inputValue}
      />

      <div className="tasks">
        {todos.length ? (
          todos.map((task, index) => {
            return (
              <TodoItem
                key={task.id}
                task={task}
                index={index}
                checkTask={checkTask}
                deleteTask={deleteTask}
              />
            );
          })
        ) : (
          <div>Нет задач... Ты свободен(на)!</div>
        )}
      </div>
      <div>Число задач: {todos.length}</div>
    </div>
  );
};

export default Todo;
