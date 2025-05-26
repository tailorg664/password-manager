import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add more routes here as needed */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
