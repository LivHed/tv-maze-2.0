import React from 'react';
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Search from './components/SearchTvShows'

// Todo
// Add routes to be able to go to another view when clicking on a tv show
// Also add a new component where more information about the tv show can be shown.
// Add tests
/*
    <div className="App">
      <BrowserRouter>
      <header className="App-header">
        TVMAZE
      </header>
      <Routes>
        <Route path="/" element={<SearchTvShows />} />
        <Route path="tvshow/:id" element={<TvShowInfo />} /> // create a component that you will be redirected to when I click on a tv show
      </Routes>
      </BrowserRouter>
    </div>
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        TVMAZE
      </header>
      <div>
        <Search />
        </div>
    </div>
  );
}

export default App;
