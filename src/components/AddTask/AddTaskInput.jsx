import React from "react";
import "./AddTaskInputStyles.scss";

const AddTodoInput = ({ addTask, inputTask, inputValue }) => {
  return (
    <form onSubmit={addTask} className="addСontainer">
      <input
        type="text"
        onChange={inputTask}
        value={inputValue}
        className="inputTask"
        placeholder="Введите задачу..."
      ></input>
      <div onClick={addTask} className="addTask">
        Добавить задачу
      </div>
    </form>
  );
};

export default AddTodoInput;
