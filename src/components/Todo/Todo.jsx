import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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

import { db } from "../../firebase";
import TodoItem from "../TodoItem";
import AddTodoInput from "../AddTaskInput";
import "./TodoStyles.scss";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState("");

  const currentDate = dayjs().format("DD.MM.YYYY");

  useEffect(() => {
    const sortedTodos = query(collection(db, "todos"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(sortedTodos, (snapshot) => {
      const allTodos = [];
      snapshot.forEach((doc) => {
        allTodos.push({ ...doc.data(), id: doc.id });
      });
      setTodos(allTodos);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
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
      file: "",
      date: date,
      timestamp: serverTimestamp(),
    });
    setDate("");
    setInputValue("");
  };

  const inputTask = ({ target }) => {
    const inputValue = target.value;
    setInputValue(inputValue);
  };

  const checkTask = async (task) => {
    await updateDoc(doc(db, "todos", task.id), {
      completed: !task.completed,
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="mainContainer">
      <div className="titleTodo">
        <div className="titleText">Список задач</div>
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
          todos.map((task) => {
            return (
              <React.Fragment key={task.id}>
                <TodoItem
                  task={task}
                  checkTask={checkTask}
                  deleteTask={deleteTask}
                />
              </React.Fragment>
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
