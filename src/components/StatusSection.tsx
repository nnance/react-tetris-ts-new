import React from "react";
import Status from "./Status";
import Controls from "./Controls";

type StatusProps = {
  level: number;
  lines: number;
  message?: string;
};

const StatusSection: React.FC<StatusProps> = props => {
  return (
    <div className="col-md-4 d-none d-md-block" style={{ textAlign: "right" }}>
      <Status fps={60} level={props.level} lines={props.lines} />
      <br />
      <br />
      <br />
      <br />
      <Controls />
      <section style={{ position: "relative", right: "20px" }}>
        {props.message}
      </section>
    </div>
  );
};

export default StatusSection;
