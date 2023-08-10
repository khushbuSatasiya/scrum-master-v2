import React, { useState, PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IconLogout, IconUserStar } from "@tabler/icons-react";
import {
  AppShell,
  Navbar,
  MediaQuery,
  Burger,
  useMantineTheme,
  ScrollArea,
  Space,
  Flex,
  Box,
  Menu,
  ThemeIcon,
} from "@mantine/core";

import { State } from "shared/interface";
import { createAction } from "shared/util/utility";
import authService from "shared/services/auth.service";
import { Gonext, Scaletech } from "shared/icons/icons";

import * as actionTypes from "store/action-types";
import { NavLinks } from "../component/NavLinks";
import { Brand } from "../component/brand";
import "../styles/layout.scss";

const handleOrg = (dataArr = []) => {
  let updateArr = [];
  dataArr.map((data) => {
    updateArr.push({
      label: data.name,
      value: data.id,
    });
  });
  return updateArr;
};

const Layout: React.FC<PropsWithChildren> = (props) => {
  const theme = useMantineTheme();
  const [isOpened, setIsOpened] = useState(false);
  // const organizationData = useSelector((state: State) => state?.auth?.user.organizations);
  // const selectedOrg = useSelector((state: State) => state?.auth?.selectedOrg);

  const dispatch = useDispatch();

  //   const [orgArray, setOrgArray] = useState<
  //     {
  //       label: string;
  //       value: string;
  //     }[]
  //   >(handleOrg(authService.getOrg()));

  /**
   * Set intitial organization data
   */
  const setInitOptions = () => {
    // if (!organizationData) {
    //   return;
    // }
    // let optionArray = organizationData.map(({ name, id }) => ({
    //   label: name,
    //   value: id,
    // }));
    // setOrgArray(optionArray);
  };

  useEffect(() => {
    setInitOptions();
  }, []);

  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      //   navbar={
      //     // <Navbar
      //     //   sx={{ boxShadow: "-8px 8px 10px #888888" }}
      //     //   p="xs"
      //     //   hiddenBreakpoint="sm"
      //     //   hidden={!isOpened}
      //     //   width={{ sm: 200, lg: 300 }}
      //     // >
      //     //   <Navbar.Section mt="xs">
      //     //     <Brand />
      //     //   </Navbar.Section>
      //     //   <Navbar.Section grow mt="md" component={ScrollArea}>
      //     //     <NavLinks />
      //     //   </Navbar.Section>
      //     //   {/* <Navbar.Section>
      // 	// 				<User />
      // 	// 			</Navbar.Section> */}
      //     // </Navbar>
      //   }
      // header={
      // 	<Header height={{ base: 70, md: 70 }} p='md'>
      // 		<Flex align={'center'} justify='space-between'>
      // 			<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
      // 				<Burger
      // 					opened={isOpened}
      // 					onClick={() => setOpened((o) => !o)}
      // 					size='sm'
      // 					color={theme.colors.gray[6]}
      // 					mr='xl'
      // 				/>
      // 			</MediaQuery>
      // 			<Text size={18} weight={900} variant={'gradient'}>
      // 				Admin
      // 			</Text>
      // 			<Space w='md' />
      // 			<Flex>
      // 				{orgArray && orgArray.length > 0 && selectedOrg && (
      // 					<Select
      // 						maw={320}
      // 						data={orgArray}
      // 						defaultValue={selectedOrg.value}
      // 						transitionProps={{
      // 							transition: 'pop-top-left',
      // 							duration: 80,
      // 							timingFunction: 'ease'
      // 						}}
      // 						onChange={(value: string) => {
      // 							const selectedOrg = orgArray.find((item) => item.value === value);
      // 							authService.setSelectedOrg(selectedOrg);
      // 							dispatch(createAction(actionTypes.SET_SELECTED_ORGANIZATION, selectedOrg));
      // 						}}
      // 						withinPortal
      // 					/>
      // 				)}
      // 				<Button
      // 					variant={'subtle'}
      // 					sx={{ marginLeft: 20 }}
      // 					onClick={() => dispatch(createAction(actionTypes.AUTH_LOGOUT_SUCCESS))}
      // 				>
      // 					<IconLogout stroke={1.5} />
      // 					<span>Logout</span>
      // 				</Button>
      // 			</Flex>
      // 		</Flex>
      // 	</Header>
      // }
    >
      <ScrollArea sx={{ backgroundColor: "#fcfcfc", height: "100%" }}>
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
            {/* <Flex align="center" mr={10}>
              {orgArray &&
                orgArray.length > 0 &&
                selectedOrg &&
                orgArray.map((data) => {
                  const { label, value } = data;
                  const isSelected = selectedOrg.label === data.label;
                  return (
                    <ThemeIcon
                      key={value}
                      mr={20}
                      variant={isSelected ? "light" : ""}
                      size={36}
                      onClick={() => {
                        if (!isSelected) {
                          authService.setSelectedOrg(data);
                          dispatch(
                            createAction(
                              actionTypes.SET_SELECTED_ORGANIZATION,
                              data
                            )
                          );
                        }
                      }}
                    >
                      {label === "Scaletech" ? (
                        <Scaletech className={"org-icon"} />
                      ) : (
                        <Gonext className={"org-icon"} />
                      )}
                    </ThemeIcon>
                  );
                })}

              <Menu
                width={200}
                shadow="md"
                withArrow
                position="bottom-end"
                trigger="hover"
              >
                <Menu.Target>
                  <ThemeIcon size={36} variant="gradient" radius="md">
                    <IconUserStar cursor="pointer" />
                  </ThemeIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    color={theme.colors.blue[5]}
                    icon={<IconLogout />}
                    onClick={() =>
                      dispatch(createAction(actionTypes.AUTH_LOGOUT_SUCCESS))
                    }
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex> */}
          </Flex>
        </Box>
        {/* <Breadcrumb /> */}
        {props.children}
      </ScrollArea>
    </AppShell>
  );
};

export default Layout;
