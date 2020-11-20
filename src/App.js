import './App.css';
import Comic from './Components/Comic.js';
import {Switch, Route, Router} from 'react-router-dom';
import ReactGA from 'react-ga';
import {useEffect} from 'react';
import {createBrowserHistory} from 'history';


const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const tracker = ({location}) => {
  ReactGA.set({page: location.pathname})
  ReactGA.pageview(location.pathname)
}

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-183669382-1')
    ReactGA.pageview(window.location.pathname)
  }, [])
  return (
    <div className="app">
      <Switch>
        <Route history = {history} render = {tracker} path='/' exact component = {Comic} />
        <Route history = {history} render = {tracker} path='/:comicNum' component = {Comic} />
      </Switch>
    </div>
  );
}

export default App; 

