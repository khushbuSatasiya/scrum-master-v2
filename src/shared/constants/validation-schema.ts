import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  time: Yup.string().required("Time is required"),
  tasks: Yup.array().of(
    Yup.object().shape({
      taskName: Yup.string().required("Task name is required"),
      projectHours: Yup.string().required("Project hours are required"),
    })
  ),
  employees: Yup.array().when("active", {
    is: (values) => {
      return false;
    },
    then: Yup.array().of(
      Yup.array().of(
        Yup.object().shape({
          task: Yup.string().required("Task is required"),
          project: Yup.string(),
          projectHours: Yup.string().required("Project hours are required"),
        })
      )
    ),
    // otherwise: Yup.array().of(
    //   Yup.array().of(
    //     Yup.object().shape({
    //       task: Yup.string(),
    //       project: Yup.string(),
    //       projectHours: Yup.string(),
    //     })
    //   )
    // ),
  }),
});

const checkInValidationSchema = Yup.object().shape({
  time: Yup.string()
    .matches(/^[0-9]{2}:[0-9]{2}$/, "Please enter valid time format (hh:mm)")
    .matches(/^[^\s]*$/, "Spaces are not allowed in the input")
    .test("valid-time", "Invalid time value", (value) => {
      if (!value) return true;

      const [hours, minutes] = value.split(":").map(Number);

      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return false;
      }

      return true;
    })
    .required("Time is required"),

  // employees: Yup.array().of(
  //   Yup.object().shape({
  //     task: Yup.string().test(
  //       "task-required",
  //       "Task is required",
  //       function (value) {
  //         const projectValue = this.parent.project;
  //         if (projectValue === "") {
  //           return true; // Task validation is skipped when project is empty
  //         }
  //         return !!value;
  //       }
  //     ),
  //     project: Yup.string()
  //       .nullable()
  //       .test("project-required", "Project is required", function (value) {
  //         const taskValue = this.parent.task;
  //         if (taskValue === "") {
  //           return true; // Project validation is skipped when task is empty
  //         }

  //         return !!value;
  //       }),
  //   })
  // ),
});

const checkOutValidationWithOptSchema = Yup.object().shape({
  time: Yup.string()
    .matches(/^[0-9]{2}:[0-9]{2}$/, "Please enter valid time format (hh:mm)")
    .matches(/^[^\s]*$/, "Spaces are not allowed in the input")
    .test("valid-time", "Invalid time value", (value) => {
      if (!value) return true;

      const [hours, minutes] = value.split(":").map(Number);

      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return false;
      }

      return true;
    })
    .required("Time is required"),
  tasks: Yup.array().of(
    Yup.object().shape({
      taskName: Yup.string().required("Task is required"),
      projectHours: Yup.string()
        .matches(
          /^[0-9]{2}:[0-9]{2}$/,
          "Please enter valid time format (hh:mm)"
        )
        .matches(/^[^\s]*$/, "Spaces are not allowed in the input")
        .test("valid-time", "Invalid time value", (value) => {
          if (!value) return true;

          const [hours, minutes] = value.split(":").map(Number);

          if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            return false;
          }

          return true;
        }),
    })
  ),
  // employees: Yup.array().of(
  //   Yup.object().shape({
  //     project: Yup.string().nullable().required("Project is required"),
  //     task: Yup.string().required("Task is required"),
  //     projectHours: Yup.string().required("Project hours are required"),
  //   })
  // ),
});

const checkOutValidationSchema = Yup.object().shape({
  time: Yup.string()
    .matches(/^[0-9]{2}:[0-9]{2}$/, "Please enter valid time format (hh:mm)")
    .matches(/^[^\s]*$/, "Spaces are not allowed in the input")
    .test("valid-time", "Invalid time value", (value) => {
      if (!value) return true;

      const [hours, minutes] = value.split(":").map(Number);

      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return false;
      }

      return true;
    })
    .required("Time is required"),
  tasks: Yup.array().of(
    Yup.object().shape({
      taskName: Yup.string().nullable().required("Task is required"),
      projectHours: Yup.string()
        .matches(
          /^[0-9]{2}:[0-9]{2}$/,
          "Please enter valid time format (hh:mm)"
        )
        .matches(/^[^\s]*$/, "Spaces are not allowed in the input")
        .test("valid-time", "Invalid time value", (value) => {
          if (!value) return true;

          const [hours, minutes] = value.split(":").map(Number);

          if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            return false;
          }

          return true;
        }),
    })
  ),
});

const checkOutwithNoTaskValidationSchema = Yup.object().shape({
  time: Yup.string()
    .matches(/^[0-9]{2}:[0-9]{2}$/, "Please enter valid time format (hh:mm)")
    .matches(/^[^\s]*$/, "Spaces are not allowed in the input")
    .test("valid-time", "Invalid time value", (value) => {
      if (!value) return true;

      const [hours, minutes] = value.split(":").map(Number);

      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return false;
      }

      return true;
    })
    .required("Time is required"),
  // employees: Yup.array().of(
  //   Yup.object().shape({
  //     project: Yup.string().nullable().required("Project is required"),
  //     task: Yup.string().required("Task is required"),
  //     projectHours: Yup.string().required("Project hours are required"),
  //   })
  // ),
});

export {
  validationSchema,
  checkOutValidationSchema,
  checkOutValidationWithOptSchema,
  checkOutwithNoTaskValidationSchema,
  checkInValidationSchema,
};
