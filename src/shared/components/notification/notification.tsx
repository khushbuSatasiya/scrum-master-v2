import { notifications } from "@mantine/notifications";

const ErrNotification = (res: any) => {
  notifications.show({
    message: res.response.data.message,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.red[6],
        borderColor: theme.colors.red[6],

        "&::before": {
          backgroundColor: theme.white,
        },
      },
      position: "bottom-right",
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": {
          backgroundColor: theme.colors.blue[7],
        },
      },
    }),
  });
};

const SuccessNotification = (res: any) => {
  notifications.show({
    message: res.message,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.blue[6],
        borderColor: theme.colors.blue[6],

        "&::before": {
          backgroundColor: theme.white,
        },
      },
      position: "bottom-right",
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": {
          backgroundColor: theme.colors.blue[7],
        },
      },
    }),
  });
};

export { SuccessNotification, ErrNotification };
