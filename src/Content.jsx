import React from "react";

const Content = (props) => {
  return (
    <div className="content">
      {" "}
      <div className="result-box">
        <div key={""}>
          <p className="answer">{props.resData}</p>
        </div>
      </div>
    </div>
  );
};

export default Content;
