import React from "react";
import parse from "html-react-parser";

const Content = (props) => {
  const htmlResponse = parse(props.resData);
  return (
    <div className="content">
      {" "}
      <div className="result-box">
        <div key={""}>
          {/* <pre className="answer">{props.resData}</pre> */}
          {htmlResponse}
        </div>
      </div>
    </div>
  );
};

export default Content;
