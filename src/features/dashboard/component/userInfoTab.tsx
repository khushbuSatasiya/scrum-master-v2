import React, { FC, Fragment } from 'react';

import { LoadingOverlay, Paper, Tabs } from '@mantine/core';

import { IUserInfoArr } from '../interface/dashboard';

interface IProps {
    activeTab: string;
    USER_INFO_ARR: IUserInfoArr[];
    isActionLoader: boolean;
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
<<<<<<< HEAD
      />
      <Paper shadow="sm" radius="lg" m={40}>
        {USER_INFO_ARR.map(({ content, value }, index) => {
          return (
            <Fragment key={index}>
              {activeTab === value && (
                <Tabs.Panel value={value} pt="lg" pl="60px" pr="60px" pb="lg">
                  {content}
                </Tabs.Panel>
              )}
            </Fragment>
          );
        })}
      </Paper>
    </Fragment>
  );
=======
      />*/}
            {/*<Paper shadow='sm' radius='lg' m={40}>*/}
            {USER_INFO_ARR.map(({ content, value }, index) => {
                return (
                    <Fragment key={index}>
                        {activeTab === value && (
                            <Tabs.Panel value={value} p={20}>
                                {content}
                            </Tabs.Panel>
                        )}
                    </Fragment>
                );
            })}
            {/*</Paper>*/}
        </Fragment>
    );
>>>>>>> design/project
};

export default UserInfoTab;
