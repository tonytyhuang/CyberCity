import React, { useEffect, useState } from "react";
//import './Components/Comic.css';
import axios from 'axios';

const Comic = (props) => {
    const comicNum = props.match.params.comicNum;
    const [comic, setComic] = useState();
    const [err, setErr] = useState();
    const [loading, setLoading] = useState();
    const [current, setCurrent] = useState();

    useEffect(() => {
        setLoading(true);
        const fetch = axios.get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json');
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
        axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${number}/info.0.json`)
        .then(response => setComic(response.data))
        .catch(err => {
            setErr(err);
        })
        .finally(() => setLoading(false));
    };

    const getCurrComic = () => {
        setLoading(true);
        axios.get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
        .then(response => {
            setComic(response.data);
            setCurrent(response.data.num);
            setLoading(false);
        })
        .catch(err => {
            setErr(err);
            setLoading(false);
        });
    };

    const getRandom = () => {
        console.log(current)
        const num = Math.floor(Math.random() * (current - 1)) + 1;
        getComic(num);
    };

    useEffect(() => {
        if (comicNum == null){
            getCurrComic();
        }else {
            getComic(comicNum)
        }
    }, [comicNum]);

    


    if (loading) {
        return <h1>Loading...</h1>
    }
    if(!comic || err){
        return <h1>Error</h1>
    }

    return (
    <div className="Comic">
        {comic.title}
        Date: {comic.month}/{comic.day}/{comic.year}
        <button disabled={comic.num <= 1} onClick={() => {
            getComic(comic.num-1)
        }}>
            previous
        </button>
        <button disabled={comic.num == current} onClick={() =>{
            getComic(comic.num+1)}}>
            next
        </button>
        <button onClick={() => getRandom()} >
            random
        </button>
        <img src = {comic.img}/>
    </div>
  );
}

export default Comic;