import React, { useState, useRef, Fragment } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

import { db, storage } from "../../../../firebase";
import "./TaskFileStyles.scss";

const TaskFile = ({ task }) => {
  const [percent, setPercent] = useState(0);

  const filePicker = useRef(null);

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateDoc(doc(db, "todos", task.id), {
            file: downloadURL,
          });
        });
        setPercent(0);
      }
    );
  };

  const triggerUploadFile = () => {
    filePicker.current.click();
  };

  return (
    <Fragment>
      <input
        ref={filePicker}
        className="inputHidden"
        type="file"
        name="file"
        onChange={(event) => uploadFile(event)}
      />
      {percent ? (
        <div className="progressContainer">
          <progress className="taskProgress" max="100" value={percent} />
        </div>
      ) : null}
      {task.file && (
        <div className="taskFile">
          <a
            className="fileLink"
            href={task.file}
            target="_blank"
            rel="noreferrer"
          >
            <button className="buttonFile">скачать файл</button>
          </a>
        </div>
      )}
      <div className="iconTask" onClick={triggerUploadFile}>
        &#128447;
      </div>
    </Fragment>
  );
};

export default TaskFile;
