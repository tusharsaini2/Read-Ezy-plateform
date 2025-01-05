import React, { useState, useEffect } from "react";
import { GiSpeaker } from "react-icons/gi";

const ListeningSection = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    () => parseInt(localStorage.getItem("lastQuestionIndex")) || 0
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState(null); // Result state for correct/wrong

  // Fetch question data from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/tusharsaini2/listening-tool-data/refs/heads/main/listeningData.json"
        ); // Replace with your API endpoint
        const data = await response.json();
        setQuestions(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Save current question index to localStorage
  const saveProgress = (index) => {
    localStorage.setItem("lastQuestionIndex", index);
  };

  // Handle option change
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Handle submit
  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setResult("correct");
      playSound("correct.mp3"); // Play correct sound
    } else {
      setResult("wrong");
      playSound("wrong.mp3"); // Play wrong sound
    }
  };

  // Function to speak the word or sentence
  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // Function to play sound
  const playSound = (filename) => {
    const audio = new Audio(`sound/${filename}`);
    audio.play();
  };

  // Handle Next button
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      saveProgress(newIndex); // Save progress
      setSelectedOption(""); // Reset selected option for new question
      setResult(null); // Reset result
    }
  };

  // Handle Previous button
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      saveProgress(newIndex); // Save progress
      setSelectedOption(""); // Reset selected option for previous question
      setResult(null); // Reset result
    }
  };

  // Ensure there are questions before rendering
  const currentQuestion = questions[currentQuestionIndex] || {
    question: "",
    options: [],
  };

  return (
    <div className="listening-section">
      <h2>Listening Exercise</h2>
      <div style={{ border: "1px solid", width: "55%" }}></div>
      <p
        style={{
          margin: "40px 0 30px 0",
          fontSize: "20px",
          paddingLeft: "5px",
        }}
      >
        Listen properly and choose the correct option.
      </p>
      <div
        style={{
          margin: "5px 0",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          padding: "10px",
          borderRadius: "10px",
          height: "230px",
          fontSize: "15px",
          overflow: "auto",
        }}
      >
        {/* Speaker icon to speak the word/sentence */}
        <GiSpeaker
          style={{ fontSize: "35px", cursor: "pointer" }}
          onClick={() => handleSpeak(currentQuestion.question)} // Trigger speech on click
        />
        <div>tap to listen</div>
        <div style={{ marginTop: "20px" }}>
          {currentQuestion.options.map((option, index) => (
            <label key={index} style={{ display: "block", margin: "10px 0" }}>
              <input
                type="radio"
                name="option"
                value={option}
                onChange={() => handleOptionChange(option)}
                checked={selectedOption === option}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      {/* Show result dynamically */}
      {result && (
        <div
          className={`result ${result === "correct" ? "correct" : "wrong"}`}
          style={{
            marginTop: "20px",
            fontSize: "18px",
            color: result === "correct" ? "green" : "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "",
          }}
        >
          {result === "correct" ? "✅ Correct!" : "❌ Wrong!"}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleSubmit}>Submit Answer</button>
        <button
          onClick={handleNext}
          disabled={
            currentQuestionIndex === questions.length - 1 ||
            selectedOption === true
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListeningSection;
