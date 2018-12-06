import React from 'react';
import Result from './Result.jsx';

const SearchResults = (props) => (
    <div className="center">
        {
            props.results.map((el, i) =>{
                return(
                 <Result item={el} key={i} />
                )
            })
        }
    </div>
);

export default SearchResults;