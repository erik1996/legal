import { Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Messenger from "./pages/Messenger";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/message/:topicId" element={<Messenger />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
