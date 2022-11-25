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
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import dayjs from "dayjs";
import "./TodoStyles.scss";
import TodoItem from "../TodoItem";
import AddTodoInput from "../AddTask/AddTaskInput";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = React.useState("");

  const currentDate = dayjs().format("DD.MM.YYYY");

  //read todos firebase
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("timestamp"));
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
    if (!inputValue || !date) {
      alert(
        "Пожалуйста, введите заголовок задачи и дату её дату завершения :)"
      );
      return;
    }
    await addDoc(collection(db, "todos"), {
      title: inputValue,
      completed: false,
      description: "",
      file: false,
      date: date,
      timestamp: serverTimestamp(),
    });
    setDate("");
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
      <div className="titleTodo">
        <div className="titleText">ToDo</div>
        <div className="dateToday">{currentDate}</div>
      </div>

      <AddTodoInput
        addTask={addTask}
        inputTask={inputTask}
        inputValue={inputValue}
        date={date}
        setDate={setDate}
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
