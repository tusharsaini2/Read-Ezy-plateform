import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
  return (
    <>
      {/* Header and Footer are always visible */}
      <Header />
      <Outlet /> {/* Content for the current route */}
      <Footer />
    </>
  );
}

export default App;
