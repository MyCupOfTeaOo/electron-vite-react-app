import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';

const history = createBrowserHistory();

const App: React.FC<any> = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="header" />
      <main className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Electron+Vite + React!</p>
        <p>
          <button
            type="button"
            onClick={() => setCount((prevCount) => prevCount + 1)}
          >
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </main>
      <Router history={history} />
    </div>
  );
};

export { history };

export default App;
