import React, { FC, Fragment } from "react";

import { Paper, Tabs } from "@mantine/core";

import { IUserInfoArr } from "../interface/dashboard";

interface IProps {
  activeTab: string;
  USER_INFO_ARR: IUserInfoArr[];
}

const UserInfoTab: FC<IProps> = ({ activeTab, USER_INFO_ARR }) => {
  return (
    <Paper shadow="sm" radius="lg" m={40}>
      {USER_INFO_ARR.map(({ content, value }, index) => {
        return (
          <Fragment key={index}>
            {activeTab === value && (
              <Tabs.Panel value={value} pt="lg" pl="20px" pb="lg">
                {content}
              </Tabs.Panel>
            )}
          </Fragment>
        );
      })}
    </Paper>
  );
};

export default UserInfoTab;
