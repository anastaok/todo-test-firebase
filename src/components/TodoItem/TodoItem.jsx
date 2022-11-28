import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../../firebase";
import TaskExecutionTime from "./components/TaskExecutionTime";
import TaskFile from "./components/TaskFile";
import Modal from "../Modal";
import "./TodoItemStyles.scss";

const TodoItem = ({ task, checkTask, deleteTask }) => {
  const [openModal, setOpenModal] = useState(false);
  const [newValueTask, setNewValueTask] = useState({
    title: task.title,
    description: task.description,
    date: task.date,
  });

  const handleEditTask = async () => {
    await updateDoc(doc(db, "todos", task.id), {
      title: newValueTask.title,
      description: newValueTask.description,
      date: newValueTask.date,
    });
  };

  const handleChangeTask = (event) => {
    setNewValueTask({
      ...newValueTask,
      [event.target.name]: event.target.value,
    });
  };

  const deleteFileTask = () => {
    updateDoc(doc(db, "todos", task.id), {
      file: "",
    });
  };

  return (
    <div className="taskCountainer" key={task.id}>
      <div className={`${task.completed ? "checkTask" : ""} taskItem`}>
        <input
          checked={task.completed}
          onChange={() => checkTask(task)}
          className="checkbox"
          type="checkbox"
        />
        <div className="taskInformation">
          <div className="taskTitle">{task.title}</div>
          {task.description ? (
            <li className="taskDescription"> {task.description}</li>
          ) : null}
          <TaskExecutionTime date={task.date} />
        </div>
        <Modal
          task={task}
          open={openModal}
          setOpen={setOpenModal}
          newValueTask={newValueTask}
          handleChangeTask={handleChangeTask}
          handleEditTask={handleEditTask}
          deleteFileTask={deleteFileTask}
        />
      </div>

      <div className="iconTaskWrapper">
        <TaskFile task={task} />
        <div onClick={() => setOpenModal(!openModal)} className="iconTask">
          &#10000;
        </div>
        <div className="iconTask" onClick={() => deleteTask(task.id)}>
          &#10008;
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
