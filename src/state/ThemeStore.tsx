import React from "react";

const themes = {
  dark: {
    backgroundColor: "#282c34",
    color: "white"
  } as React.CSSProperties,
  light: {
    backgroundColor: "#eeeeee",
    color: "#000000"
  } as React.CSSProperties
};

type ThemeActions = {
  toggle: () => void;
  setTheme: (theme: string) => void;
};

type ThemeStore = [React.CSSProperties, ThemeActions];

const ThemeStore = React.createContext<ThemeStore>([
  themes.dark,
  {} as ThemeActions
]);

const themeActions = (
  setState: React.Dispatch<React.SetStateAction<React.CSSProperties>>
): ThemeActions => ({
  toggle: (): void => {
    setState(prevState =>
      prevState === themes.dark ? themes.light : themes.dark
    );
  },
  setTheme: (theme): void => {
    setState(state =>
      theme === "dark" ? themes.dark : theme === "light" ? themes.light : state
    );
  }
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(themes.dark);
  const actions = themeActions(setState);

  return (
    <ThemeStore.Provider value={[state, actions]}>
      {children}
    </ThemeStore.Provider>
  );
};

export default ThemeStore;
