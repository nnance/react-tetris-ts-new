import React from "react";
import ThemeStore from "../state/ThemeStore";
import { parse } from "query-string";
import { useHistory } from "react-router-dom";

const useTheme = (): React.CSSProperties => {
  const [theme, setTheme] = React.useContext(ThemeStore);
  const { location } = useHistory();

  const params = parse(location.search);
  setTheme.setTheme(params.theme as string);

  React.useEffect(() => {
    document.body.style.backgroundColor =
      theme.backgroundColor || document.body.style.backgroundColor;
    document.body.style.color = theme.color || document.body.style.color;
  }, [theme]);

  return theme;
};

export default useTheme;
