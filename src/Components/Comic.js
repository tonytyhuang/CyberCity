import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams, Redirect } from 'react-router-dom';
import './Comic.css'
import axios from 'axios';

const Comic = (props) => {
    const comicNum = props.match.params.comicNum;
    const [comic, setComic] = useState();
    const [err, setErr] = useState();
    const [loading, setLoading] = useState();
    const [current, setCurrent] = useState();
    const history = useHistory();

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

    

    useEffect(() => {
        if (comicNum == null){
            getCurrComic();
        }else if (comicNum === 'random'){
            setLoading(true);
            setErr(null);
            axios.get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
                .then(response => {
                    const latest = response.data.num;
                    const random = Math.floor(Math.random() * (latest - 1)) + 1;
                    props.history.replace(`/${random}`);
                })
        }
        else {
            getComic(comicNum)
        }
    }, [comicNum]);

    


    if (loading) {
        return <h1>Loading...</h1>
    };
    if(!comic){
        return <h1>Error</h1>;
    };

    if (err){
        if (err.response && err.response.status === 404 && comicNum !== undefined ){
            console.log(err.response.status)
            return (<Redirect to = "/"/>);
        }
        console.log("bye")
        return <h1>Error</h1>;
    }

    return (
    <div className="Comic">
        {comic.title}
        Date: {comic.month}/{comic.day}/{comic.year}
        <button disabled={comic.num <= 1} onClick={() => {
            history.push(`/${comic.num - 1}`)
        }}>
            previous
        </button>
        <button disabled={comic.num === current} onClick={() =>{
            history.push(`/${comic.num+1}`)
        }}>
            next
        </button>
        <button onClick={() => history.push('/random')} >
            random
        </button>
        <img src = {comic.img}/>
    </div>
  );
}

export default Comic;