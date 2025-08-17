import { Routes,Route } from "react-router-dom";
import "./styles/App.css";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Note from "./pages/Note.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home/>}/>
        <Route path="notes" element={<Note/>}>
          <Route path=":id" element={<Note/>}/>
          <Route path="nueva" element={<Note/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
