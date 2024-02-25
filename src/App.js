import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookSearch from './BookSearch';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/booksearch" component={BookSearch} />
          {/* Add other routes if needed */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
