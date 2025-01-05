import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroSection from "./component/HeroSection.jsx";
import Section from "./component/Section.jsx";
import ReadingArea from "./component/ReadingArea.jsx";
import SpeakingSection from "./component/SpeakingSection.jsx";
import ListeningSection from "./component/ListeningSection.jsx";
import Translator from "./component/Translator.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Common layout with Header and Footer
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection /> {/* Shown only on home route */}
            <Section />
          </>
        ),
      },
      { path: "/Reading-tool", element: <ReadingArea /> },
      { path: "/Speaking-tool", element: <SpeakingSection /> },
      { path: "/Listening-tool", element: <ListeningSection /> },
      { path: "/Translator-tool", element: <Translator /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
