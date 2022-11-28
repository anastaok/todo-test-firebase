import { Fragment } from "react";
import "./ModalStyles.scss";

const Modal = ({
  task,
  open,
  setOpen,
  newValueTask,
  handleChangeTask,
  handleEditTask,
  deleteFileTask,
}) => {
  const clickSave = () => {
    handleEditTask();
    setOpen(false);
  };
  return (
    <div className={`overlay animated ${open ? "show" : ""}`}>
      <div className="modal">
        <span className="iconTaskModal" onClick={() => setOpen(!open)}>
          &#10008;
        </span>
        <div className="titleInputWrapper">
          <div className="titleTask">Задача:</div>
          <input
            className="titleInput"
            name="title"
            type="text"
            value={newValueTask.title}
            onChange={handleChangeTask}
          />
        </div>
        <div className="descTextWrapper">
          <div className="titleDesc">Описание:</div>
          <textarea
            className="descTextarea"
            name="description"
            type="text"
            value={newValueTask.description}
            onChange={handleChangeTask}
          />
        </div>
        <div className="titleInputWrapper">
          <div className="titleTask">Дата завершения:</div>
          <input
            type="date"
            name="date"
            className="dateInput"
            value={newValueTask.date}
            onChange={handleChangeTask}
          />
        </div>
        <div className="fileWrapper">
          {task.file && (
            <Fragment>
              <a
                className="fileLink"
                href={task.file}
                target="_blank"
                rel="noreferrer"
              >
                <button className="buttonModal">СКАЧАТЬ ФАЙЛ</button>
              </a>
              <button className="buttonModal" onClick={deleteFileTask}>
                УДАЛИТЬ ФАЙЛ
              </button>
            </Fragment>
          )}
        </div>
        <button className="buttonModal" onClick={clickSave}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Modal;
