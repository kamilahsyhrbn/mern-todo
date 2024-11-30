import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import Login from "./pages/Login";
import UpdateProfile from "./pages/UpdateProfile";
import ProtectedRoute from "./config/protectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ProtectedRoute />
                <Task />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/update-profile"
            element={
              <div>
                <ProtectedRoute />
                <UpdateProfile />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
