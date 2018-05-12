import React, {PropTypes} from 'react';

const SearchData = {
  id: number,
  title: string,
  category: string,
  url: string
};

const Search = ({data: SearchData}) => {

    const { id, title, category, url} = data;
    
   return (<div className="search-default">
      <div className="search-heading"><h4>{title}</h4></div>
      <div className="panel-body">
          <div className="category"> {category}</div>
          <a className="url" href="url"> {title}</a>
      </div>
    </div>);
};

export default Search;
