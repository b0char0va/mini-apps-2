import React from 'react';

const Result = (props) => (
    <div className="item">
        {props.item.description}
        <button className="btn btn-1" type="button"><i className="material-icons icon-1">&#xe254;</i>Edit</button>
        <button className="btn btn-1" type="button"><i className="material-icons icon-1">favorite_border</i>Add to Favorites</button>
    </div>
);

export default Result;