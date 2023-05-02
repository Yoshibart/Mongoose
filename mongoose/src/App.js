// App.js

import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Insert from './Insert';
import Change from './Change';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/change" element={<Change />} />
      </Routes>
    </>
  );
};

export default App;

