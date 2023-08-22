import React, { FC, Fragment } from "react";

import { LoadingOverlay, Tabs } from "@mantine/core";

import { IUserInfoArr } from "../interface/dashboard";

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
}) => {
  return (
    <Fragment>
      {/*<LoadingOverlay
        loaderProps={{
          size: "xl",
        }}
        visible={isActionLoader}
        overlayBlur={2}
      />*/}

      {USER_INFO_ARR.map(({ content, value }, index) => {
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
    </Fragment>
  );
};

export default UserInfoTab;
