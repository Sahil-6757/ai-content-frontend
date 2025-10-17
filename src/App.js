import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import "./App.css";
import axios from "axios";
function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("funny");
  const [platform, setPlatform] = useState("Instagram");
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateCaptions = async () => {
    if (!topic || !platform || !tone) alert("Please fill all the fields");

    setLoading(true);
    const res = await axios.post("http://localhost:5000/api/generate", {
      topic,
      tone,
      platform,
    });

    setCaptions(res.data);
    setLoading(false);
    setTopic("");
    // setCaptions(res.data.captions.split("\n"));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl text-white font-bold text-center mb-4 header-text">
        AI Caption Generator
      </h1>
      <div className="ai-response container">
        <div className="mt-4">{<Markdown>{`${captions}`}</Markdown>}</div>
      </div>
      {/* <div className="left-bar">
        <h5>History</h5> <hr />
        <ul className="history-list">
          <li>fresh mango</li>
        </ul>
      </div> */}

      <div className="container d-flex input-form">
        <input
          className="form-control mb-2 mx-2"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />{" "}
        <br />
        <select
          onChange={(e) => setTone(e.target.value)}
          className="border drop-down p-2 mx-2  mb-2 form-control"
        >
          <option>funny</option>
          <option>professional</option>
          <option>romantic</option>
        </select>
        <select
          onChange={(e) => setPlatform(e.target.value)}
          className="border drop-down p-2 mx-2 mb-2 form-control"
        >
          <option>Instagram</option>
          <option>LinkedIn</option>
          <option>YouTube</option>
        </select>
        <button
          onClick={generateCaptions}
          className="btn btn-primary text-white p-2 rounded mx-2  mb-2"
          style={{ width: "21rem" }}
        >
          {loading ? "Generating..." : "Generate Captions"}
        </button>
      </div>
    </div>
  );
}

export default CaptionGenerator;
