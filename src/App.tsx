import { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Group, Loader } from "@mantine/core";

import Layout from "shared/hoc/layout/container/layout";
import { Dashboard, User } from "shared/hoc/asyncComponents";

import "./App.css";

const App: FC = () => {
  return (
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
          <Route path="/:token" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />

          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
