import ForgotPassword from "./ForgotPassword"
import PlacementDashboard from "./PlacementDashboard"
import MyApplications from "./MyApplications"
import Jobs from "./Jobs"
import UpdatePassword from "./UpdatePassword"
import EditProfile from "./EditProfile"
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"
import UserDashboard from "./UserDashboard"
import Delete from "./Delete"
import Admin from "./Admin"
function App () {
    return(
      <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home/>}/>
               <Route path="/reg" element={<Register/>}/>
               <Route path="/log" element={<Login/>}/>
               <Route path="/forgot" element={<ForgotPassword />} />
               <Route path="/dboard" element={<UserDashboard/>}/>
               <Route path="/placement" element={<PlacementDashboard />} />
               <Route path="/edit" element={<EditProfile/>}/>
               <Route path="/password" element={<UpdatePassword/>}/>
               <Route path="/delete" element={<Delete/>}/>
               <Route path="/jobs" element={<Jobs/>}/>
               <Route path="/applications" element={<MyApplications/>}/>
               <Route path="/admin" element={<Admin/>}/>
            </Routes>
      </BrowserRouter>
    )

}
export default App