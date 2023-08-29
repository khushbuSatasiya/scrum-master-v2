import React, { useState, PropsWithChildren, useEffect } from "react";
import {
  AppShell,
  MediaQuery,
  Burger,
  useMantineTheme,
  ScrollArea,
  Space,
  Flex,
  Box,
} from "@mantine/core";

import "../styles/layout.scss";

const Layout: React.FC<PropsWithChildren> = (props) => {
  const theme = useMantineTheme();
  const [isOpened, setIsOpened] = useState(false);

   


  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"  
    >
      {/* <ScrollArea
      type="never"
        sx={{
          backgroundColor: "#F0F3F4",
          height: "100%",
       
        }}
        scrollbarSize={2}
      > */}
        <Box p="md" pb={0}>
          <Flex align={"center"} justify="space-between">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={isOpened}
                onClick={() => setIsOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Space w="md" />
           
          </Flex>
        </Box>
        {/* <Breadcrumb /> */}
        {props.children}
      {/* </ScrollArea> */}
    </AppShell>
  );
};

export default Layout;
