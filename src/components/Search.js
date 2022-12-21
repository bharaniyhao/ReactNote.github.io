import React from "react";
import { MdSearch } from "react-icon/md"

const Search = () => {
    return ( <
        div className = 'Search' >
        <
        MdSearch className = 'search-icons'
        size = '1.3em' / >
        <
        input type = "text"
        placeholder = "Type to Search....." / >

        <
        /div>
    );
};

export default Search;