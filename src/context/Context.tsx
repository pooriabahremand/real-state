import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";

// Define the type for your Context value
interface ContextValue {
  toggleColorMode: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const Context = createContext<ContextValue>({
  toggleColorMode: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export default function MUIWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: '"Vazirmatn", sans-serif',
        },
      }),
    [mode]
  );

  return (
    <Context.Provider
      value={{
        toggleColorMode: muiWrapperUtils.toggleColorMode,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
}
