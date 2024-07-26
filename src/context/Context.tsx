import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { MUIContextValue } from "../interface/interface";

export const Context = createContext<MUIContextValue>({
  toggleColorMode: () => {},

});

export default function MUIWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>("light");
 



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

      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
}
