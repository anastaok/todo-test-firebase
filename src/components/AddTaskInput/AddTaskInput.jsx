import React from "react";

import "./AddTaskInputStyles.scss";

const AddTodoInput = ({ addTask, inputTask, inputValue, date, setDate }) => {
  return (
    <form onSubmit={addTask} className="addСontainer">
      <input
        type="text"
        onChange={inputTask}
        value={inputValue}
        className="inputTask"
        placeholder="Введите задачу..."
      />
      <input
        type="date"
        className="inputDate"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div type="submit" onClick={addTask} className="addTask">
        Добавить задачу
      </div>
    </form>
  );
};

export default AddTodoInput;
