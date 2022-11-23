import React from "react";
import Modal from "../Modal";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import "./TodoItemStyles.scss";

const TodoItem = ({ task, checkTask, deleteTask }) => {
  const [newValueTask, setNewValueTask] = React.useState({
    title: task.title,
    description: task.description,
  });
  const [open, setOpen] = React.useState(false);

  const handleEditTask = async () => {
    await updateDoc(doc(db, "todos", task.id), {
      title: newValueTask.title,
      description: newValueTask.description,
    });
  };
  console.log(newValueTask);
  const handleChangeTask = (e) => {
    e.preventDefault();
    setNewValueTask({ ...newValueTask, [e.target.name]: e.target.value });
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
          {task.title}&#46;&nbsp;
          {task.description ? (
            <li className="taskDescription"> {task.description}</li>
          ) : (
            ""
          )}
        </div>
        <Modal
          open={open}
          setOpen={setOpen}
          newValueTask={newValueTask}
          handleChangeTask={handleChangeTask}
          handleEditTask={handleEditTask}
        />
      </div>

      <div className="iconTaskWrapper">
        <div className="iconTask">&#128447;</div>
        <div onClick={() => setOpen(true)} className="iconTask">
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
