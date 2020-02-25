import React from "react";

type ContainerProps = {
  theme: React.CSSProperties;
};

const Container: React.FC<ContainerProps> = props => {
  const style: React.CSSProperties = {
    ...props.theme,
    ...{
      textAlign: "center",
      height: "100%"
    }
  };

  return (
    <div style={style} className="container-fluid">
      {props.children}
    </div>
  );
};

export default Container;
