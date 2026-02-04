import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Todo from "./pages/Todo";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
};

export default App;
