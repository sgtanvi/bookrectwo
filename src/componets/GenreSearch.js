import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const GenreSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/subjects/${encodeURIComponent(searchTerm)}.json?details=true`
      );

      setSearchResults(response.data.works);

      const savedBooks = response.data.works.map((work, index) => ({
        put: `id:mynamespace:book::book-${index + 1}`,
        fields: {
          author: work.authors ? work.authors.map((author) => author.name).join(', ') : 'Unknown Author',
          title: work.title,
          genre: response.data.name || 'Unknown Genre', // Use the subject name as the genre
          tags: work.subjects ? work.subjects.map((subject) => subject.name).join(', ') : 'Unknown Genre',
          digest: work.first_publish_year
            ? `First published in ${work.first_publish_year}`
            : 'No summary available',
        },
      }));

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
        placeholder="Enter subject"
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
                <p className="author">
                  {item.authors ? item.authors.map((author) => author.name).join(', ') : 'Unknown Author'}
                </p>
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

export default GenreSearch;
