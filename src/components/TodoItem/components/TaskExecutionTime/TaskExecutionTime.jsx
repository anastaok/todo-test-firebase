import dayjs from "dayjs";
import "dayjs/locale/ru";

import "./TaskExecutionTimeStyles.scss";

const TaskExecutionTime = ({ date }) => {
  const currentDate = dayjs().valueOf();
  const taskDate = Date.parse(date);
  const taskEstimation = dayjs(date).locale("ru").format("D MMMM YYYY");

  return (
    <div className="taskDate">
      {dayjs(currentDate).diff(taskDate, "day") <= 0 ? (
        <div className="dateCompletion">
          Дата завершения:&nbsp;
          {taskEstimation}
        </div>
      ) : (
        <div className="dateOverdue">
          Задача просрочена:&nbsp;
          {taskEstimation}
        </div>
      )}
    </div>
  );
};

export default TaskExecutionTime;
