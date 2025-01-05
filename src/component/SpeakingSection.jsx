import React, { useState, useEffect } from "react";

const SpeakingSection = () => {
  const [sentences, setSentences] = useState([]); // Store all sentences
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current sentence index
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Fetch sentences from API
    const fetchSentences = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/tusharsaini2/speaking-tool-data/refs/heads/main/SpeakingData.json"
        );
        const data = await response.json();
        setSentences(data.sentences); // Save the array of sentences
      } catch (error) {
        console.error("Error fetching sentences:", error);
        setSentences(["Unable to fetch sentences. Please try again later."]);
      }
    };

    fetchSentences();

    // Initialize SpeechRecognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recogInstance = new SpeechRecognition();
      recogInstance.lang = "en-IN";
      recogInstance.interimResults = false;
      recogInstance.maxAlternatives = 1;

      recogInstance.onresult = (event) => {
        const spokenText = event.results[0][0].transcript
          .replace(/[.,!?;:]/g, "")
          .trim()
          .toLowerCase();
        const expectedText = sentences[currentIndex]
          .replace(/[.,!?;:]/g, "")
          .trim()
          .toLowerCase();

        if (spokenText === expectedText) {
          setResult("✅ Correct");
          playSound("correct.mp3");
        } else {
          setResult("❌ Wrong");
          playSound("wrong.mp3");
        }
        console.log("Spoken Text:", spokenText);
        setAudioBlob(new Blob(["sample audio"], { type: "audio/wav" })); // Simulating audio blob
        setIsRecording(false); // Allow restart
      };

      recogInstance.onerror = (event) => {
        console.error("Recognition Error:", event.error);
        setResult("❌ Error in recognition");
        setIsRecording(false); // Allow restart
      };

      setRecognition(recogInstance);
    } else {
      alert("Speech Recognition is not supported in your browser.");
    }
  }, [sentences, currentIndex]);

  const startRecording = () => {
    setIsRecording(true);
    setResult(null); // Clear previous result
    if (recognition) {
      recognition.start();
      console.log("Recording started...");
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      console.log("Recording stopped.");
    }
  };

  const playSound = (filename) => {
    const audio = new Audio(`sound/${filename}`);
    audio.play();
  };

  const nextSentence = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setResult(null); // Clear result when changing the sentence
    }
  };

  const previousSentence = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setResult(null); // Clear result when changing the sentence
    }
  };

  return (
    <div className="speaking-section">
      <h2>Speaking Exercise</h2>
      <div style={{ border: "1px solid", width: "55%" }}></div>
      <p
        style={{
          marginTop: "40px",
          fontSize: "20px",
          paddingLeft: "5px",
        }}
      >
        Read this sentence aloud:
      </p>
      <p
        style={{
          margin: "10px 0",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          padding: "20px",
          borderRadius: "10px",
          height: "200px",
          fontSize: "25px",
        }}
      >
        {sentences.length > 0 ? sentences[currentIndex] : "Loading..."}
      </p>
      <div
        className="result"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {result && <p>{result}</p>}
      </div>
      <div>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button onClick={previousSentence} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={nextSentence}
          disabled={currentIndex === sentences.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SpeakingSection;
