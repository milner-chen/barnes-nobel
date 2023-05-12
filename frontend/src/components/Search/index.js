import { useState } from "react";

const SearchBar = () => {
    const [search, setSearch] = useState("");

    return (
        // <div className="search-bar">
        //     {/* <input
        //     type="text"
        //     placeholder="Search by Title, Author, or Keyword"
        //     /> */}
        //     <p>{search}</p>
        // </div>
        <input className="search-bar"
            placeholder="Search by Title, Author, or Keyword"
        />
    )
}

export default SearchBar;