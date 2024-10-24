import { useState, useEffect } from 'react'
import axios from "axios"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

// Unsure of which ones can be null sometimes and which ones that can have other types than null other times (like string)
export interface TvShow {
    averageRuntime: number,
    dvdCountry: string | null,
    ended: string | null,
    externals: {tvrage: null, thetvdb: number, imdb: string},
    genres: string[],
    id: number,
    image: { medium: string, original: string } | null, 
    language: string,
    name: string,
    network: {} | null,
    officialSite: string | null,
    premiered: string,
    rating: {average: null},
    runtime: number | null,
    schedule: {time: string, days: []},
    status: string,
    summary: string,
    type: string,
    updated: number,
    url: string,
    webChannel: {id: number, name: string, country: {name: string, code: string, timezone: string}, officialSite: null} | null,
    weight: number,
    _links: {previousepisode: {href: string, name: string}, self: {href: string} }
} 

// Each object in the response from the api have a show object with all the data of each tv show.
interface SearchResult {
    show: TvShow;
}

// Each object in the response from the api have a score (number). Use when adding another page to view more info about one tv show, and add the score.
interface Score {
    score: number
}

function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
   
    // Use when adding a new page that I'm redirected to when clicking on a card. 
    const navigate = useNavigate();
    const handleClickTvShow = (id: number) => {
        console.log(id)
        navigate(`/tvshow/${id}`)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const searchInput = e.target.value;
        setSearchTerm(searchInput)

        if (searchInput === '') {
            setSearchResults([]);
        }
      }

    useEffect(() => {
        const debounceTimer = setTimeout(() => { // debouncing with setTimeout waits 500 ms before the api call is made
        if (searchTerm !== '')
        axios
            .get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
            .then((response) => {
                console.log(response.data)
                setSearchResults(response.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }, 500) // the API call will be made 500 ms after the user stops typing
        return () => clearTimeout(debounceTimer) //returns a function that clears the timeout if the searchTerm changes before the timeout is executed. its run before the next useEffect call, or when the component is deleted. It clears the timer (stops the delayed code from running if the user continues to type quickly or changes pages).
    }, [searchTerm])

    return (
        <>
        <div className="container">
            <div className="Search-bar"> 
                <input
                className="Search-field"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder='Search for TV shows'
                >
                </input>
            </div>
        </div>
            <div className="Card-container">
                {searchResults.length > 0 ? searchResults.map(({ show }: SearchResult, index: number) =>
                <Card sx={{ maxWidth: 225 }} key={index} className="Tv-show-card">
                    <CardMedia
                    sx={{ height: 265, minWidth: 195 }}
                    image={show.image  ? show.image.medium : 'default_image_url'}
                    title={show.name}
                    />
                <CardActions>
                    <Button 
                    className='Tv-show-name' 
                    onClick={() => handleClickTvShow(show.id)} 
                    size="small">
                    {show.name}
                    </Button>
                </CardActions>
                </Card>
                
                )
                : <div></div>
                } 
            </div>
    
    </>
    )
}

export default Search