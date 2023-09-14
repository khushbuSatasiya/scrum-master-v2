import React, { FC } from "react";

import { Select } from "@mantine/core";

import { useSelector } from "react-redux";
import { IProUserList } from "../interface/calendar.interface";

import { State } from "shared/interface";

interface IProps {
  proList: IProUserList[];
  usersList: IProUserList[];
  getTeamReport: (projectId: string, month: string, userId: string) => void;
  form: any;
  setPId: (id: string) => void;
  setUId: (id: string) => void;
}

const CalendarFilter: FC<IProps> = ({
  proList,
  usersList,
  getTeamReport,
  form,
  setPId,
  setUId,
}) => {
  const customStyles = {
    input: {
      minHeight: "unset",
      height: "32px",
      width: "166px",
    },
  };

  const month = useSelector((state: State) => state.getMonth.month);

  return (
    <>
      <Select
        searchable
        placeholder="Pick one"
        nothingFound="No options"
        data={["All", "By User", "By Project"]}
        transitionProps={{
          transition: "pop-top-left",
          duration: 80,
          timingFunction: "ease",
        }}
        styles={customStyles}
        {...form.getInputProps("filteredData")}
        onChange={(filteredData) => {
          form.setFieldValue("userId", "");
          form.setFieldValue("projectId", "");
          form.setFieldValue("filteredData", filteredData);
        }}
      />

      {form.values.filteredData === "By User" && (
        <Select
          allowDeselect
          searchable
          placeholder={"Select Member"}
          nothingFound="No options"
          data={usersList}
          transitionProps={{
            transition: "pop-top-left",
            duration: 80,
            timingFunction: "ease",
          }}
          {...form.getInputProps("userId")}
          onChange={(userId) => {
            getTeamReport(undefined, month, userId);
            setUId(userId);
            form.setFieldValue("userId", userId);
          }}
          styles={customStyles}
          ml={12}
          clearable
        />
      )}

      {form.values.filteredData === "By Project" && (
        <Select
          allowDeselect
          searchable
          placeholder={"Select Project"}
          nothingFound="No options"
          data={proList}
          transitionProps={{
            transition: "pop-top-left",
            duration: 80,
            timingFunction: "ease",
          }}
          {...form.getInputProps("projectId")}
          onChange={(projectId) => {
            getTeamReport(projectId, month, undefined);
            setPId(projectId);
            form.setFieldValue("projectId", projectId);
          }}
          styles={customStyles}
          ml={12}
          clearable
        />
      )}
    </>
  );
};

export default CalendarFilter;
