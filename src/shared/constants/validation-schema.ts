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

const checkOutValidationWithOptSchema = Yup.object().shape({
  time: Yup.string().required("Time is required"),
  tasks: Yup.array().of(
    Yup.object().shape({
      taskName: Yup.string().required("Task name is required"),
      projectHours: Yup.string().required("Project hours are required"),
    })
  ),
  employees: Yup.array().of(
    Yup.object().shape({
      project: Yup.string().nullable().required("Project is required"),
      task: Yup.string().required("Task is required"),
      projectHours: Yup.string().required("Project hours are required"),
    })
  ),
});

const checkOutValidationSchema = Yup.object().shape({
  time: Yup.string().required("Time is required"),
  tasks: Yup.array().of(
    Yup.object().shape({
      taskName: Yup.string().required("Task name is required"),
      projectHours: Yup.string().required("Project hours are required"),
    })
  ),
});

const checkOutwithNoTaskValidationSchema = Yup.object().shape({
  time: Yup.string().required("Time is required"),
  employees: Yup.array().of(
    Yup.object().shape({
      project: Yup.string().nullable().required("Project is required"),
      task: Yup.string().required("Task is required"),
      projectHours: Yup.string().required("Project hours are required"),
    })
  ),
});

export {
  validationSchema,
  checkOutValidationSchema,
  checkOutValidationWithOptSchema,
  checkOutwithNoTaskValidationSchema,
};
