import React, { useEffect, useState } from 'react';
import '../css/banner.css'
import axios from './axios'
import requests from '../Requests';

const Banner = () => {

    const [movie, setMovie] = useState([]);

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]
            );
            return request;
        }
        fetchData();
    }, [])

    return (
        <header className='banner' style={{
            backgroundSize: 'cover',
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            backgroundPosition: 'center center',
        }}>

            <div className='banner_content'>
                <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner_buttons'>
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My list</button>
                </div>
                <h1 className='banner_description'>
                    {truncate(movie?.overview, 160)}
                </h1>
            </div>
            <div className='banner--fadeButton' />
        </header>
    )
};

export default Banner;