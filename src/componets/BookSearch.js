import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=20`
      );
      setSearchResults(response.data.docs);

      // Save all 20 books as JSON
      const savedBooks = {};
      response.data.docs.forEach((book, index) => {
        savedBooks[index + 1] = {
          author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
          title: book.title,
          genre: book.subject ? book.subject.join(', ') : 'Unknown Genre',
          summary: book.first_publish_year
            ? `First published in ${book.first_publish_year}`
            : 'No summary available',
        };
      });

      const jsonContent = JSON.stringify(savedBooks, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });

      // Save the JSON file using FileSaver.js
      saveAs(blob, 'savedBooks.json');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        placeholder="Enter book title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="button" onClick={handleSearch}>
        Search
      </button>

      {searchResults.length > 0 ? (
        <div>
          <ul className="resultsList">
            {searchResults.map((item, index) => (
              <li key={index} className="resultItem">
                <p className="title">{item.title}</p>
                <p className="author">{item.author_name ? item.author_name.join(', ') : 'Unknown Author'}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="noResultsText">No results found</p>
      )}
    </div>
  );
};

export default BookSearch;
