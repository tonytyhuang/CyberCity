import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';



function App() {
  const [comic, setComic] = useState();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const fetch = axios.get('/http://xkcd.com/info.0.json');
    fetch.then(response => {
      setComic(response.data)
      setLoading(false);
    });
    fetch.catch(err => {
      setErr(err);
    })
    fetch.finally(() => setLoading(false));
  }, []);

  const getComic = (number) => { 
    setLoading(true);
    axios.get(`/http://xkcd.com/${number}/info.0.json`)
      .then(response => setComic(response.data))
      .catch(err => {
        setErr(err);
      })
      .finally(() => setLoading(false));
  };
  if (loading) {
    return <h1>Loading...</h1>
  }
  if(!comic || err){
    return <h1>Error</h1>
  }

  return (
    <div className="App">
      {comic.title}
      <button disabled={true} onClick={() => {
        if (comic.num > 1){
        getComic(comic.num-1)
        }
      }}>
        previous
      </button>
      <button onClick={() => getComic(comic.num+1)}>
        next
      </button>
      <img src = {comic.img}/>
    </div>
  );
}

export default App;
