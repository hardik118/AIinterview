import { Routes, Route } from 'react-router-dom';
import Interview from "../src/pages/interview"

function App() {
  return (
    <Routes>
      <Route path="/Interview" element={<Interview />} />
    </Routes>
  );
}

export default App;
