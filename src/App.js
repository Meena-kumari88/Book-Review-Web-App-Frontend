import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
