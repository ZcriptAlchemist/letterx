import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import parse from "html-react-parser";

const Content = ({ loading, resData }) => {
  const [copyTxt, setCopyTxt] = useState("copy");
  const [textToCopy, setTextToCopy] = useState([]);

  const copyHandler = () => {
    const paras = Array.from(document.querySelectorAll(".resHTML p"));

    const newTextToCopy = paras.map((para) => {
      return `${para.textContent} \n \n`;
    });

    setTextToCopy(newTextToCopy);
    setCopyTxt("copied ✅");

    setTimeout(() => {
      setCopyTxt("copy");
    }, 2000);
  };

  useEffect(() => {
    textToCopy.forEach((e) => {
      console.log(e);
    });
  }, [textToCopy]);

  const htmlResponse = parse(resData);
  return (
    <div className="content">
      {!loading ? (
        <div className="result-box">
          <CopyToClipboard text={textToCopy} onCopy={copyHandler}>
            <button
              className={!resData == "" ? "copy-active" : "copy"}
              onClick={() => copyHandler()}
            >
              {copyTxt}
            </button>
          </CopyToClipboard>
          <div className="resHTML">{htmlResponse}</div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

Content.propTypes = {
  loading: PropTypes.bool.isRequired,
  resData: PropTypes.string.isRequired,
};

export default Content;
