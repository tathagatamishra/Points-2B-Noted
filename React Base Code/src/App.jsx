import "./App.scss";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <div className="webBody">

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
