import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SearchTvShows from './components/SearchTvShows'
import TvShow from './components/TvShow'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header className="App-header">
        TVMAZE
      </header>
      <Routes>
        <Route path="/" element={<SearchTvShows />} />
        <Route path="tvshow/:id" element={<TvShow />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
