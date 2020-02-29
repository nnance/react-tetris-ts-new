import React from "react";
import ThemeStore from "../state/ThemeStore";
import { RouteComponentProps } from "react-router-dom";
import { parse } from "query-string";

const ThemedContainer: React.FC<RouteComponentProps> = ({
  children,
  location
}) => {
  const [theme, setTheme] = React.useContext(ThemeStore);

  React.useEffect(() => {
    document.body.style.backgroundColor =
      theme.backgroundColor || document.body.style.backgroundColor;
    document.body.style.color = theme.color || document.body.style.color;
  }, [theme]);

  React.useEffect(() => {
    const params = parse(location.search);
    setTheme.setTheme(params.theme as string);
  });

  return <div>{children}</div>;
};

export default ThemedContainer;
