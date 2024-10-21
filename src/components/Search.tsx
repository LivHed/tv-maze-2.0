import { useState } from 'react'

interface searchInput {
    input: string,
}

function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<searchInput[]>([]);

     const handleInputChange = (e: any) => { 
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm)
      } 

    return (
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
                <button className="Search-button">Search</button>
            </div>
        </div>
    )
 
}

export default Search