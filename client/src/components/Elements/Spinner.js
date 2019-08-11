import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div>
      <img
        style={{
          width: "200px",
          display: "block",
          margin: "auto"
        }}
        src={spinner}
        alt=""
      />
    </div>
  );
}
