import React from "react";

const Box = (props) => {
  console.log("props:", props);
  return (
    <div className="box">
      Box{props.num}
      <p>{props.name}</p>
    </div>
  );
};

/** Box를 수출한다. */
export default Box;
