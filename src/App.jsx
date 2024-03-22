import "./App.css";
import { useState } from "react";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config(); // Assuming you have an .env file

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// console.log(model); // This line won't be executed in the browser

// // This is where you would use the model for text generation in the browser
// // (code for using the model goes here)

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const getResponse = async () => {
    if (!value) {
      setError("please make a valid request");
      return;
    }

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.log(error);
      setError("Something went wrong! try again laterz");
    }
  };

  return (
    <>
      <div className="head">
        <h1>LetterX 📬</h1>
        <h2>your personal letter writer powered by Google's Gemini LLM </h2>
      </div>
      <div className="result-box">
        <div key={""}>
          {error && <p>{error}</p>}
          <p className="answer"></p>
        </div>
      </div>

      <div className="input-box">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="main-input"
          placeholder="write me a leave letter"
        />
        {!error && (
          <button onClick={getResponse} className="err-btn">
            shoot
          </button>
        )}
        {error && <button className="err-btn">clear</button>}
      </div>
    </>
  );
}

export default App;
