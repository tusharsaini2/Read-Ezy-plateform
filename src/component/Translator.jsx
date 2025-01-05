import { useEffect, useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { GiSpeaker } from "react-icons/gi";
import { IoMicSharp } from "react-icons/io5";

const Translator = () => {
  const [inputText, setInputText] = useState(""); // Input text state
  const [outputText, setOutputText] = useState(""); // Translated text state
  const [error, setError] = useState(""); // Error state
  const [fromLang, setFromLang] = useState("en"); // Source language
  const [toLang, setToLang] = useState("hi"); // Target language

  useEffect(() => {
    if (inputText.trim()) {
      handleTranslate();
    }
  }, [inputText]);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter text to translate!");
      setOutputText("");
      return;
    }

    try {
      // setError(""); // Clear any previous errors

      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=${fromLang}|${toLang}`
      );

      const data = await response.json();

      if (data.responseData.translatedText) {
        setOutputText(data.responseData.translatedText); // Set translated text
      } else {
        setError("Translation failed. Please try again.");
        setOutputText("");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred during translation.");
      setOutputText("");
    }
  };

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(outputText);
      utterance.lang = toLang === "hi" ? "hi-IN" : "en-IN"; // Adjust language
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech!");
    }
  };

  const recordSpeech = () => {
    const micSound = new Audio("sound/rec.mp3");
    micSound.play();

    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = fromLang === "en" ? "en-IN" : "hi-IN"; // Adjust language
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log("Recording started...");
      };

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setInputText(speechResult);

        // handleTranslate(); // Automatically translate the recorded speech
      };

      recognition.onerror = (error) => {
        console.error("Speech recognition error:", error);
      };

      recognition.onend = () => {
        console.log("Recording ended.");
      };

      recognition.start();
    } else {
      alert("Your browser does not support speech recognition!");
    }
  };

  const toggleLanguages = () => {
    setFromLang((prev) => (prev === "en" ? "hi" : "en"));
    setToLang((prev) => (prev === "hi" ? "en" : "hi"));
    setInputText(outputText); // Clear input and output on language toggle
    setOutputText("");
  };

  return (
    <>
      <h1 className="trans-name" style={{ position: "relative", left: "40%" }}>
        ReadEzy Translation
      </h1>
      <div
        style={{
          width: "60%",
          height: "30%",
          position: "relative",
          left: "20%",
          margin: "20px",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            From
            <div
              style={{
                padding: "5px",
                width: "150px",
                textAlign: "center",
                fontSize: "20px",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              }}
              // disabled
            >
              <div>{fromLang === "en" ? "English" : "Hindi"}</div>
            </div>
          </div>
          <div
            onClick={toggleLanguages}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <LiaExchangeAltSolid />
          </div>
          <div
            style={{
              fontSize: "30px",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            To
            <div
              style={{
                padding: "5px",
                width: "150px",
                textAlign: "center",
                fontSize: "20px",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              }}
              disabled
            >
              <div>{toLang === "hi" ? "Hindi" : "English"}</div>
            </div>
          </div>
          <button
            onClick={handleTranslate}
            style={{
              padding: "5px",
              margin: "0",
              width: "150px",
              fontSize: "20px",
              border: "none",
              borderRadius: "15px",
              color: "#fff",
              cursor: "pointer",
              backgroundColor: "#00A676",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            }}
          >
            Translate
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <textarea
              cols={35}
              rows={10}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type text here..."
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                border: "none",
                padding: "20px",
                fontSize: "20px",
                outline: "none",
              }}
            ></textarea>
            <IoMicSharp
              className="mic"
              onClick={recordSpeech}
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          </div>
          <div style={{ position: "relative", flex: 1 }}>
            <textarea
              cols={35}
              rows={10}
              value={outputText}
              readOnly
              placeholder="Translated text will appear here..."
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                border: "none",
                padding: "20px",
                fontSize: "20px",
                outline: "none",
              }}
            ></textarea>
            <GiSpeaker
              onClick={speakText}
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        {error && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default Translator;
