import React from 'react'

function Search({ onSearch }) {
    return (
        <div className="search-container">
            <input type="text" name="search" id="search" className="search-box" onChange={onSearch} />
        </div>
    )
}

export default Search