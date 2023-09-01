import { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Group } from "@mantine/core";

import Layout from "shared/hoc/layout/container/layout";
import { Dashboard, User } from "shared/hoc/asyncComponents";
import TokenExpired from "shared/components/tokenExpried/tokenExpired";

import "./App.css";

const App: FC = () => {
  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <Group w="100%" h="500px" position="center" align="center">
              {/* <Loader size="xl" /> */}
            </Group>
          }
        >
          <Routes>
            <Route path="/user/list" element={<User />} />
            <Route path="verify-token/:token" element={<Dashboard />} />
            <Route path="/token-expired" element={<TokenExpired />} />
            <Route path="/" element={<Dashboard />} />

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
};

export default App;
