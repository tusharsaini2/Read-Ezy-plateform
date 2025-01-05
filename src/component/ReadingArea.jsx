import { useEffect, useState } from "react";
import ReadingControls from "./ReadingControls";

const ReadingArea = () => {
  const [selectedSpeed, setSelectedSpeed] = useState(1); // Default speed
  const [sentences, setSentences] = useState([]); // Sentences from API
  const [currentIndex, setCurrentIndex] = useState(0); // Track current sentence index
  const [result, setResult] = useState("");

  useEffect(() => {
    // Fetch data from API
    fetch(
      "https://raw.githubusercontent.com/tusharsaini2/Sentences-data-file/refs/heads/main/SentenceData.json"
    )
      .then((response) => response.json())
      .then((data) => setSentences(data.sentences))
      .catch((error) => console.error("Error fetching sentences:", error));
  }, []);

  useEffect(() => {
    if (result.includes("✅")) {
      const correctSound = new Audio("sound/correct.mp3");
      correctSound.play();
    } else if (result.includes("❌")) {
      const wrongSound = new Audio("sound/wrong.mp3");
      wrongSound.play();
    }
  }, [result]);

  // Handle Next Sentence
  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setResult("");
    } else {
      alert("No more sentences!");
    }
  };

  // Handle Previous Sentence
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setResult("");
    } else {
      alert("This is the first sentence!");
    }
  };

  const currentSentence =
    sentences.length > 0 ? sentences[currentIndex].text : "Loading..."; // Current sentence text

  const words = currentSentence.split(" "); // Split current sentence into words

  // Function to read a specific word when clicked
  const handleWordClick = (word) => {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-IN"; // Language (change as needed)
    speech.rate = selectedSpeed; // Set the selected speed
    window.speechSynthesis.speak(speech); // Speak the clicked word
  };

  return (
    <>
      <div className="reading-readEzy">
        <h1>Reading Tool</h1>
      </div>
      <div className="reading-area">
        <div className="reading-box" style={{ padding: "20px" }}>
          <h2 style={{ fontWeight: "100" }}>
            {words.map((word, index) => (
              <span
                key={index}
                style={{
                  cursor: "pointer",
                  marginRight: "5px",
                  borderRadius: "5px",
                  backgroundColor: "#FFFF00",
                  padding: "5px",
                }}
                onClick={() => handleWordClick(word)} // Word click handler
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        <ReadingControls
          textToRead={currentSentence} // Pass current sentence
          selectedSpeed={selectedSpeed}
          setSelectedSpeed={setSelectedSpeed}
          onNext={handleNext} // Pass Next handler
          onPrevious={handlePrevious} // Pass Previous handler
          setResult={setResult}
        />
      </div>
      <div
        style={{
          width: "49%",
          position: "relative",
          left: "17%",
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <div>{result}</div>
      </div>
    </>
  );
};

export default ReadingArea;
