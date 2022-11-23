import "./ModalStyles.scss";

const Modal = ({
  open,
  setOpen,
  newValueTask,
  handleChangeTask,
  handleEditTask,
}) => {
  const clickSave = () => {
    handleEditTask();
    setOpen(false);
  };
  return (
    <div className={`overlay animated ${open ? "show" : ""}`}>
      <div className="modal">
        <span className="iconTaskModal" onClick={() => setOpen(false)}>
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
        {/* <input name="myFile" type="file" /> */}

        <button className="saveChange" onClick={clickSave}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Modal;
