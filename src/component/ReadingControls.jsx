import React, { useState } from "react";
import { GiSpeaker } from "react-icons/gi";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { SiSpeedtest } from "react-icons/si";
import { IoMicSharp } from "react-icons/io5";

const ReadingControls = ({
  textToRead,
  selectedSpeed,
  setSelectedSpeed,
  onNext,
  onPrevious,
  setResult,
}) => {
  const [recordText, setRecordText] = useState("Record"); // Button text state

  // Function to handle Text-to-Speech for the entire text
  const handleReadText = () => {
    if (textToRead) {
      const speech = new SpeechSynthesisUtterance(textToRead);
      speech.lang = "en-IN"; // Set language
      speech.rate = selectedSpeed; // Set the selected speed
      window.speechSynthesis.speak(speech); // Speak the entire text
    } else {
      alert("No text to read!");
    }
  };

  // Function to change speed
  const handleSpeedChange = (e) => {
    const speedMap = {
      normal: 1,
      "very-slow": 0.2,
      slow: 0.5,
      fast: 1.5,
      "very-fast": 2,
    };
    setSelectedSpeed(speedMap[e.target.value]);
  };

  const handleRecordBtn = () => {
    const speechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false; // only show final result

    setRecordText("Listening.."); // Update button text
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.trim();
      if (
        spokenText
          .replace(/[.,!?;:]/g, "")
          .trim()
          .toLowerCase() ===
        textToRead
          .replace(/[.,!?;:]/g, "")
          .trim()
          .toLowerCase()
      ) {
        setResult("✅ Correct!");
      } else {
        setResult('❌ Wrong! You said: "' + spokenText + '"');
      }
      setRecordText("Record"); // Reset button text
    };

    recognition.onerror = (error) => {
      alert("Error occurred: " + error.error);
      setRecordText("Record");
    };

    recognition.onend = () => {
      setRecordText("Record");
    };
  };

  return (
    <>
      <div className="controls">
        <div className="options">
          <select className="custom-select" onChange={handleSpeedChange}>
            <option value="normal">Normal</option>
            <option value="very-slow">Very Slow</option>
            <option value="slow">Slow</option>
            <option value="fast">Fast</option>
            <option value="very-fast">Very Fast</option>
            <SiSpeedtest />
          </select>
        </div>
        <li onClick={handleReadText}>
          Read it <GiSpeaker />
        </li>
        <li id="record" onClick={handleRecordBtn}>
          {recordText} <IoMicSharp />
        </li>
        <div className="sentence-ctrl">
          <li onClick={onPrevious}>
            Previous <MdSkipPrevious />
          </li>
          <li onClick={onNext}>
            Next <MdSkipNext />
          </li>
          <li>
            <a href="/">
              Home <IoMdHome />
            </a>
          </li>
        </div>
      </div>
    </>
  );
};

export default ReadingControls;
