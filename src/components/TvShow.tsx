import { useParams } from 'react-router-dom'
import {useEffect, useState } from 'react'
import axios from 'axios'
import { TvShow } from './SearchTvShows'

// handle state for one tv show, make axios api call but with only one tv show, that you click on in the search page.

/*interface Params {
	id: string;
} */

function TvShowInfo () {
    const { id } = useParams<{ id: string }>(); // hämta id från urlen
 //   const { id } = useParams<Params{id}>();
    const [searchResult, setSearchResult] = useState<TvShow | null>(null);

    useEffect(() => {
        axios
        .get(`https://api.tvmaze.com/shows/${id}`)
        .then((response) => {
            setSearchResult(response.data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [id])
    
    return (
    <div>
			<h1>Tv show info</h1>
			<p>ID: {id}</p>
		</div>
    )
}

export default TvShowInfo