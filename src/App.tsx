import { Routes,Route } from "react-router-dom";
import "./styles/App.css";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.jsx";
import Note from "./pages/Note.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="notes">
          <Route path=":id" element={<Note/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
