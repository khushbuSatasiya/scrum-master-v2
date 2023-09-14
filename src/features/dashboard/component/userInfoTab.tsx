import React, { FC, Fragment } from "react";

import { Group, Loader, Tabs } from "@mantine/core";

import { IUserInfoArr } from "../interface/dashboard";
import isEmpty from "lodash/isEmpty";
import NoRecords from "shared/components/noRecords/noRecords";

interface IProps {
  activeTab: string;
  USER_INFO_ARR: IUserInfoArr[];
  isActionLoader: boolean;
  actionType: string;
}

const UserInfoTab: FC<IProps> = ({
  activeTab,
  USER_INFO_ARR,
  isActionLoader,
  actionType,
}) => {
  return (
    <Fragment>
      <Group
        sx={{
          height: `${isActionLoader && "500px"}`,
          display: `${isActionLoader ? "flex" : "unset"}`,
          justifyContent: `${isActionLoader && "center"}`,
        }}
      >
        {isActionLoader && <Loader variant="dots" />}

        {!isActionLoader &&
          !isEmpty(actionType) &&
          USER_INFO_ARR.map(({ content, value }, index) => {
            return (
              <Fragment key={index}>
                {activeTab === value && (
                  <Tabs.Panel value={value} pl="20px" pr="20px" pb="lg">
                    {content}
                  </Tabs.Panel>
                )}
              </Fragment>
            );
          })}

        {isEmpty(actionType) && !isActionLoader && <NoRecords />}
      </Group>
    </Fragment>
  );
};

export default UserInfoTab;
