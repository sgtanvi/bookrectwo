import React from 'react';
import BookSearch from './componets/BookSearch.js'; // Make sure to provide the correct path
import GenreSearch from './componets/GenreSearch.js'; // Make sure to provide the correct path

const App = () => {
  return (
    <div className="App">
      <h1>Genre Search App</h1>
      <GenreSearch />
    </div>
  );
};

export default App;
