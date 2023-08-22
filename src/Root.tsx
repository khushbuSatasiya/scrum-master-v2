import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {
  ColorScheme,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

import ErrorBoundary from "shared/errorBoundary/errorBoundary";

import App from "./App";
import store from "./store";

const rtlCache = createEmotionCache({
  key: "mantine-rtl",
  prepend: true,
});

const Root: React.FC = (props) => {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const toggleDirection = () =>
    setDir((current) => (current === "rtl" ? "ltr" : "rtl"));

  useHotkeys([
    ["mod+J", () => toggleColorScheme()],
    ["mod + shift + L", () => toggleDirection()],
  ]);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        {/* <WithErrorHandler> */}
        <BrowserRouter>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                dir,
                colorScheme,
                headings: {
                  fontFamily: "Inter, Helvetica, sans-serif",
                },
                activeStyles: { transform: "scale(0.95)" },
                //primaryColor: 'indigo',
                primaryShade: 6,
                colors: {
                  indigo: [
                    "#EDF2FF",
                    "#DBE4FF",
                    "#BAC8FF",
                    "#91A7FF",
                    "#748FFC",
                    "#5C7CFA",
                    "#4C6EF5",
                    "#4263EB",
                    "#3B5BDB",
                    "#364FC7",
                  ],
                },
                loader: "dots",

                fontFamily: "Inter, Helvetica, sans-serif",
                defaultGradient: {
                  from: "indigo",
                  to: "cyan",
                  deg: 45,
                },
              }}
              emotionCache={dir === "rtl" ? rtlCache : undefined}
            >
              <Notifications position="top-right" />
              <App {...props} />
            </MantineProvider>
          </ColorSchemeProvider>
        </BrowserRouter>
        {/* </WithErrorHandler> */}
      </ErrorBoundary>
    </Provider>
  );
};

export default Root;
