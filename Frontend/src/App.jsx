import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Password from "./pages/Password.jsx";
import useAuthStore from "./store/useAuthStore.js";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";

function App() {
  const {isCheckingAuth,checkAuth,authUser} = useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[])
  if(isCheckingAuth){
    return <div>loading</div>
  }
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
        <Route path="/login" element={!authUser?<Login />:<Navigate to={"/password"}/>} />
        <Route path="/signup" element={!authUser?<SignUp />:<Navigate to={"/password"}/>} />
        <Route path="/password" element={authUser?<>
                 <Navbar />
                 <Password />
               </> :<Navigate to={"/login"} replace/>}/>
        {/* Add more routes here as needed */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
