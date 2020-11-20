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
        return <div class="loader-wrapper">
        <span class="loader"><span class="loader-inner"></span></span>
    </div>
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
        <div class = "head">
            <h1>{comic.title}</h1>
            <h2>Date: {comic.month}/{comic.day}/{comic.year}</h2>
            <div class = "buttons">
                <button class = "left" id = "but" disabled={comic.num <= 1} onClick={() => {
                    history.push(`/${comic.num - 1}`)
                }}>
                    previous
                </button>
                <button class = "left" id = "but" disabled={comic.num === current} onClick={() =>{
                    history.push(`/${comic.num+1}`)
                }}>
                    next
                </button>
                <button id = "but" onClick={() => history.push('/random')} >
                    random
                </button>
            </div>
        </div>
        <img src = {comic.img} title = {comic.alt} alt = {comic.title}/>
        <div class = "buttons-bot">
                <button id = "but" class = "left" disabled={comic.num <= 1} onClick={() => {
                    history.push(`/${comic.num - 1}`)
                }}>
                    previous
                </button>
                <button id = "but" class = "left" disabled={comic.num === current} onClick={() =>{
                    history.push(`/${comic.num+1}`)
                }}>
                    next
                </button>
                <button id = "but" onClick={() => history.push('/random')} >
                    random
                </button>
            </div>
    </div>
  );
}

export default Comic;