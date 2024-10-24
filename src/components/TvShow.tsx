import { useParams, useNavigate } from 'react-router-dom'
import {useEffect, useState } from 'react'
import axios from 'axios'
import { TvShow } from './SearchTvShows'

function TvShowInfo () {
    const { id } = useParams<{ id: string }>() // hämta id från urlen
    const [tvShow, setTvShow] = useState<TvShow | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios
        .get(`https://api.tvmaze.com/shows/${id}`)
        .then((response) => {
            setTvShow(response.data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [id])

    const handleGoBack = () => {
        navigate('/')
      };

    // If thShow is null or undefined, render the loading div (implement a loading spinner instead)
    // Else if tvShow is defined (not null or undefined), render the div with the tvshow details.
    // handles that summary is wrapped in p tags with a regex that removes the p tags and only show the text.
    return (
        <div>
            <button onClick={handleGoBack} className="Go-back-button">Back to search results</button>
            {!tvShow ? (
                <div>Loading...</div>
                ) : (
                <div  className="Tv-show-info">
                    <h1 className="TV-show-name">{tvShow.name}</h1>
                    <img src={tvShow.image?.medium} alt={tvShow.name} />
                    <div>Genres: {tvShow.genres}</div>
                    <div>{tvShow.summary.replace(/<\/?[^>]+(>|$)/g, "")}</div>
                </div>
                )  
            }
        </div>
    )
}

export default TvShowInfo