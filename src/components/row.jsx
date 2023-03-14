import React, { useEffect, useState } from 'react'
import '../css/row.css'
import axios from './axios';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {

    const [movies, setMovies] = useState([]);

    const base_url = 'https://image.tmdb.org/t/p/original/'

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl])

    const movieData = movies.map((movie) => {
        return (
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                <img className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                    key={movie.id}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`} alt={movie.name} />
            )
        )

    })

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {movieData}
            </div>
        </div>
    )
};

export default Row;
