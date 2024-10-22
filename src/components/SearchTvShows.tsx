import { useState, useEffect } from 'react'
import axios from "axios"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
//import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
//import { useNavigate } from 'react-router-dom'
//import Typography from '@mui/material/Typography'

/*interface searchInput {
    input: string,
} */

    //osäker på hur jag ska typa några av dessa
interface TvShow {
 //   averageRuntime: number,
 //   dvdCountry: null,
 //   ended: string,
 //   externals: {},
 //   genres: [],
    id: number,
    image: { medium: string } //in some cases its {}
 //   language: string,
    name: string,
 //   network: {},
 //   officialSite: string,
 //   premiered: string,
 //   rating: {},
 //   runtime: number,
 //   schedule: {},
 //   status: string,
 //   summary: string,
 //   type: string,
 //   updated: number,
 //   url: string,
 //   webChannel: null,
 //   weight: number,
 //   _links: {},
} 

// varje objekt i returen från api:et innehåller ett show objekt, med all data om varje tv show
interface SearchResult {
    show: TvShow;
}


function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
   
    const handleClickTvShow = (id: number) => {
        console.log(id)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const searchInput = e.target.value;
        console.log('first searchTerm:', searchTerm)
        setSearchTerm(searchInput)
        console.log('second:', searchTerm)

        // Om söktermen är tom, rensa resultaten i listan
        if (searchInput === '') {
            setSearchResults([]);  // Rensar sökresultaten
        }
      }
    // Varje gång searchTerm ändras, triggar useEffecten en ny API-förfrågan till TVMaze APIet
    //och lägger till söktermen som en del av URLen (?q=${searchTerm}).
    useEffect(() => {
        if (searchTerm !== '') // bara göra en förfrågan om söktermen inte är tom
        axios
            .get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`) // searchTerm läggs till i URLen
            .then((response) => {
                console.log(response.data)
                setSearchResults(response.data) //spara resultaten
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [searchTerm]) // // useEffect reagerar på förändringar i searchTerm

    return (
        <>
        <div className="container">
            <div className="Search-bar"> 
                <input
                className="Search-field"
                type="text"
                value={searchTerm}
                onChange={handleInputChange} //uppdaterar söktermen när man skriver i fältet
                placeholder='Search for TV shows'
                >
                </input>
            </div>
        </div>
         {/* Om searchResults innehåller något (är större än 0), renderas varje Card för varje show. Om listan är tom visas istället en Loader-komponent
         använder map() funktionen för att iterera över varje element i searchResults. Varje objekt i searchResults innehåller ett show-objekt. Genom att använda { show } som en parameter i map() extraheras direkt show-objektet från varje element. index används för att ge varje renderad komponent en unik key med key={index} för att kunna rendera listan */}
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
                : <div>{/*tom div istället för en loader eller tex en "No results" text */}</div>
                } 
            </div>
    
    </>
    )
}

export default Search