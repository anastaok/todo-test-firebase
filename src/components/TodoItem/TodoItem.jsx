import React from "react";
import Modal from "../Modal";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import "./TodoItemStyles.scss";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const TodoItem = ({ task, checkTask, deleteTask }) => {
  // edit tasks
  const [newValueTask, setNewValueTask] = React.useState({
    title: task.title,
    description: task.description,
    date: task.date,
  });
  const [open, setOpen] = React.useState(false);

  const handleEditTask = async () => {
    await updateDoc(doc(db, "todos", task.id), {
      title: newValueTask.title,
      description: newValueTask.description,
      date: newValueTask.date,
    });
  };
  const handleChangeTask = (e) => {
    e.preventDefault();
    setNewValueTask({ ...newValueTask, [e.target.name]: e.target.value });
  };

  // edit date tasks
  const currentDate = dayjs().valueOf();
  const taskDate = Date.parse(task.date);

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
          {task.title}
          {task.description ? (
            <li className="taskDescription"> {task.description}</li>
          ) : (
            ""
          )}

          <div className="taskDate">
            {currentDate < taskDate ? (
              <div className="dateCompletion">
                Дата завершения:&nbsp;
                {dayjs(task.date).locale("ru").format("D MMMM YYYY")}
              </div>
            ) : (
              <div className="dateOverdue">
                Задача просрочена:&nbsp;
                {dayjs(task.date).locale("ru").format("D MMMM YYYY")}
              </div>
            )}
          </div>
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
