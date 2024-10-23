import { useState, useEffect } from 'react'
import axios from "axios"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
//import { useNavigate } from 'react-router-dom'

// Unsure of which ones can be null sometimes and which ones that can have other types than null other times (like string)
interface TvShow {
    averageRuntime: number,
    dvdCountry: null,
    ended: string,
    externals: {tvrage: null, thetvdb: number, imdb: string},
    genres: string[],
    id: number,
    image: { medium: string, original: string }, 
    language: string,
    name: string,
    network: {},
    officialSite: string,
    premiered: string,
    rating: {average: null},
    runtime: number,
    schedule: {time: string, days: []},
    status: string,
    summary: string,
    type: string,
    updated: number,
    url: string,
    webChannel: {id: number, name: string, country: {name: string, code: string, timezone: string}, officialSite: null}
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
    // const navigate = useNavigate();
    const handleClickTvShow = (id: number) => {
        console.log(id)
     // navigate('/tvshow/ + id)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const searchInput = e.target.value;
        setSearchTerm(searchInput)

        if (searchInput === '') {
            setSearchResults([]);
        }
      }

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
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
        }, 500)
        return () => clearTimeout(debounceTimer)
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