import { useState, useEffect } from 'react'
import axios from "axios"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

// Unsure of which ones can be null sometimes and which ones that can have other types than null other times (like string)
export interface TvShow {
    averageRuntime: number,
    dvdCountry: string | null,
    ended: string | null,
    externals: {tvrage: number, thetvdb: number, imdb: string},
    genres: string[],
    id: number,
    image: { medium: string, original: string } | null, 
    language: string,
    name: string,
    network: {id: number, name: string, country: {name: string, code: string, timezone: string}, officialSite: string} | null
    officialSite: string | null,
    premiered: string | null,
    rating: {average: number | null},
    runtime: number | null,
    schedule: {time: string, days: string[]},
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
export interface SearchResult {
    show: TvShow;
}

// Each object in the response from the api have a score (number). Use when adding another page to view more info about one tv show, and add the score.
interface Score {
    score: number
}

function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
   
    const navigate = useNavigate()
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
        }, 500)
        return () => clearTimeout(debounceTimer)
    }, [searchTerm])

    // todo - check why some of the images content disappears underneath the top of the image space inside of the cards, but doesn't when you view it in the info page about the show (is it because of the change from div to ul, li elements?)
    // todo - add a default image url
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
                <ul className="list-items" key={index}>
                    <li>
                        <Card className="Tv-show-card"
                            sx={{ 
                                width: 235, 
                                height: 360,
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between' 
                            }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 300, width: '100%' }}
                                image={show.image  ? show.image.medium : 'default_image_url'}
                                title={show.name}
                                alt="Tv show image"/>
                            <CardActions
                                sx={{ 
                                    height: 60, 
                                    padding: '8px', 
                                    textAlign: 'center', 
                                    overflow: 'hidden'
                                }}>
                                <Box
                                    sx={{
                                        display: 'block',
                                        whiteSpace: "normal",
                                        lineHeight: 1.2,
                                        textAlign: 'center',
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                    <Button
                                    onClick={() => handleClickTvShow(show.id)} 
                                    size="small"
                                    fullWidth
                                    sx={{color: '#000000', fontWeight: '500'}}
                                    >
                                    {show.name}
                                    </Button>
                                </Box>
                            </CardActions>
                        </Card>
                    </li>
                </ul>
                )
                : <div></div>
                } 
            </div>
    
    </>
    )
}

export default Search