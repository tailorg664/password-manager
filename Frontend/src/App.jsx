import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Password from "./pages/Password.jsx";
import useAuthStore from "./store/useAuthStore.js";
import {useEffect} from "react";
import Loading  from "./components/Loading.jsx";
function App() {
  const {isCheckingAuth,
      isSigningUp,
      isLoggingIn,
      isLoggingOut,checkAuth,authUser} = useAuthStore();
  const shouldShowLoader =
    isCheckingAuth || isSigningUp || isLoggingIn || isLoggingOut;
  useEffect(()=>{
    checkAuth()
  },[])
  return (
    <>{shouldShowLoader && <Loading />}
      <div className={`${shouldShowLoader ? "blur-sm pointer-events-none select-none" : ""}`}>
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
          <Route path="/login" element={!authUser?<Login />:<Navigate to={"/password"}/>} />
          <Route path="/signup" element={!authUser?<Signup />:<Navigate to={"/password"}/>} />
        <Route path="/password" element={!authUser?<>
                   <Navbar />
                   <Password />
                 </> :<Navigate to={"/login"} replace/>}/>
                 {/* have to change this later */}
          {/* Add more routes here as needed */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
