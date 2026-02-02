import { Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Leave from "./component/Leave/Leave";
import Header from "./component/Header/Header";
import User from "./component/User/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="" element={<Home />} />
        <Route path="leave" element={<Leave />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
}

export default App;
