import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Result from './components/Result';
import Panel from 'kromac-ui-18/dist/Panel';
import './App.style.scss';
import classNames from 'classnames';

const App = () => {
  const [showPersonalInfo, setShowPersonalInfo] = useState('hidden');
  const modalClassNames = classNames(`modal`, {
    [showPersonalInfo]: setShowPersonalInfo,
  });

  return (
    <div
      className="App kromac-scroll"
      onClick={(e) => {
        setShowPersonalInfo('hidden');
        e.stopPropagation();
      }}
    >
      <header>
        <Link to="/">
          <h1 className="text-bg-light">Trip Calculator</h1>
        </Link>
        <h4
          onClick={(e) => {
            setShowPersonalInfo('');
            e.stopPropagation();
          }}
        >
          Jc
        </h4>
        <section className={modalClassNames}>
          <Panel>
            <h5>Personal information & Resources</h5>
            <a
              href="https://www.linkedin.com/in/jonathan-narv%C3%A1ez-mart%C3%ADnez-338102233/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://curriculum-jcnm.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Web curriculum
            </a>
            <a
              href="https://github.com/Naramatsu"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              href="Jonathan+Camilo+Narvaez+Martinez+[CV].pdf"
              target="_blank"
              rel="noreferrer"
              download
            >
              Resume (PDF)
            </a>
            <a
              href="https://www.linkedin.com/in/jonathan-narv%C3%A1ez-mart%C3%ADnez-338102233/"
              target="_blank"
              rel="noreferrer"
            >
              Project repository
            </a>
          </Panel>
        </section>
      </header>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
