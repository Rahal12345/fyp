import React, { useCallback, useState } from "react";
import CountUp from "react-countup";
import axios from 'axios';

function Home() {
  const [source, setSource] = useState("");
  const [trans, setTrans] = useState("");
  const [score, setScore] = useState(-1);

  const handleEstimate = useCallback(async() => {
    try {
      const response = await axios.post('http://localhost:5000/getpredictions', {
        source: source,
        target: trans
      });

      // Access the score from the response
      const score = response.data.score;
      setScore(score);
    } catch (error) {
      console.error(error);
    }
  }, [source, trans]);
  return (
    <div className="fixed h-screen overflow-hidden z-0 w-full">
      <video autoPlay loop muted className="w-full">
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-4 left-0 right-0  flex items-center justify-between mx-8">
        <lable className="text-white text-3xl font-semibold px-4">Source</lable>
        <input
          value={source}
          className="rounded-lg w-4/5 text-white bg-cyan-950 p-2  focus:outline-none"
          onChange={(e) => {
            setSource(e.target.value);
            setScore(-1);
          }}
        />
      </div>
      <div className="absolute top-24 left-0 right-0  flex items-center justify-between mx-8">
        <lable className="text-white text-3xl font-semibold px-4">
          Translation
        </lable>
        <input
          value={trans}
          className="rounded-lg w-4/5 text-white bg-cyan-950 p-2 p-2  focus:outline-none"
          onChange={(e) => {
            setTrans(e.target.value);
            setScore(-1);
          }}
        />
      </div>

      <CountUp
        start={0}
        end={score}
        duration={5}
        separator=" "
        decimals={0}
        suffix=" %"
      >
        {({ countUpRef, start }) => (
          <div>
            {score !== -1 && (
              <span
                className="absolute top-48 left-0 right-0  flex items-center justify-center mx-8 font-bold text-cyan-300"
                style={{
                  "font-size": 160,
                  "text-shadow": "0 0 8px #000000, 0 0 5px #000000",
                }}
                ref={countUpRef}
              />
            )}
            <button
              onClick={async () => {
                await handleEstimate();
                start();
              }}
              className="bg-cyan-900 hover:bg-cyan-700 text-white p-4 rounded-2xl absolute top-36  right-8  flex items-center bg-white transition hover:scale-105"
            >
              Estimate the Quality
            </button>
          </div>
        )}
      </CountUp>
    </div>
  );
}

export default Home;
