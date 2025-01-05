import { Link } from "react-router-dom";

const Section = () => {
  return (
    <section class="tools-section">
      <div class="tool-card">
        <div class="tool-image">
          <img src="image/Reading.jpg" alt="Tool 1 Image" />
        </div>
        <div class="tool-content">
          <h2>Reading Tool</h2>
          <p>
            ReadEzy enhances your reading experience with features like
            adjustable reading speed, interactive word pronunciation, and easy
            navigation between sentences. Click any word to hear its
            pronunciation, set your preferred speed, and get instant feedback
            with sound effects. Perfect for learners and readers of all ages, it
            makes reading engaging, fun, and educational.
          </p>

          <Link to="/Reading-tool" class="tool-button">
            Reading Tool
          </Link>
        </div>
      </div>

      <div class="tool-card">
        <div class="tool-image">
          <img src="image/Speaking.jpg" alt="Tool 2 Image" />
        </div>
        <div class="tool-content">
          <h2>Speaking Tool</h2>
          <p>
            This interactive Speaking Exercise tool helps users practice
            pronunciation and speaking skills by reading sentences aloud. It
            uses advanced speech recognition technology to evaluate spoken
            sentences and provides instant feedback with sound effects for
            correct or incorrect pronunciations. Features include easy
            navigation between sentences, real-time recording, and a
            user-friendly interface to make speaking practice engaging and
            effective for all learners.
          </p>

          <Link to="/Speaking-tool" class="tool-button">
            Speaking Tool
          </Link>
        </div>
      </div>
      <div class="tool-card">
        <div class="tool-image">
          <img src="image/listening.jpg" alt="Tool 2 Image" />
        </div>
        <div class="tool-content">
          <h2>Listening Tool</h2>
          <p>
            The Listening Exercise tool offers an interactive way to practice
            listening skills. It presents questions with multiple-choice options
            and provides instant feedback. Users can listen to the questions
            using a speaker icon, track their progress with "Previous" and
            "Next" buttons, and save their progress for later use.
          </p>

          <Link to="/Listening-tool" class="tool-button">
            Listening Tool
          </Link>
        </div>
      </div>
      <div class="tool-card">
        <div class="tool-image">
          <img src="image/Translation.jpg" alt="Tool 2 Image" />
        </div>
        <div class="tool-content">
          <h2>Translation Tool</h2>
          <p>
            This translation tool provides text translation, speech recognition,
            and speech synthesis features. Users can type text to translate it,
            listen to the translation using speech synthesis, and input text
            through speech recognition. It is useful for people who communicate
            in multiple languages and need easy and efficient translation and
            voice interaction.
          </p>

          <Link to="/Translator-tool" class="tool-button">
            Translation Tool
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section;
