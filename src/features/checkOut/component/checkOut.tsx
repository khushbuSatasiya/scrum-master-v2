import React, { FC, useCallback, useState } from "react";

import { useForm } from "@mantine/form";
import CheckOutForm from "../checkOutForm";

interface IProps {
  enteredTask: any;
}

const CheckOut: FC<IProps> = ({ enteredTask }) => {
  const formatValues = (userTask: any) => {
    if (userTask.length > 0) {
      const tasksArray = userTask.map((task: any) => {
        return {
          taskId: task.id,
          taskName: task.task,
          projectHours: "",
          projectName: task.projectdeatils.projectName,
        };
      });

      return {
        time: "",
        employees: [
          [
            {
              task: "",
              project: "",
              projectHours: "",
            },
          ],
        ],
        tasks: tasksArray,
      };
    } else {
      return {
        time: "",
        employees: [
          [
            {
              task: "",
              project: "",
              projectHours: "",
            },
          ],
        ],
        tasks: [
          {
            taskId: "",
            projectId: "",
            taskName: "",
            projectHours: "",
          },
        ],
      };
    }
  };

  const form = useForm({
    initialValues: formatValues(enteredTask.findUser[0].usertasks),
  });

  const handleCheckOut = useCallback(async (values: any) => {
    console.log(values, ">>>");
  }, []);

  return (
    <div>
      <CheckOutForm
        handleCheckOut={handleCheckOut}
        form={form}
        userTasks={enteredTask.findUser[0].usertasks}
      />
    </div>
  );
};

export default CheckOut;
