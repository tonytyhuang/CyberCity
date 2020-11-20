import './App.css';
import Comic from './Components/Comic.js';
import {Switch, Route, Link} from 'react-router-dom';


function App() {
  return (
    <div className="app">
      <Switch>
        <Route path='/' component = {Comic} />
        <Route path='/:comicNum' component = {Comic} />
      </Switch>
    </div>
  );
}

export default App;
