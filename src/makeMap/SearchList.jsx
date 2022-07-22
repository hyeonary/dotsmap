import './SearchList.css'
import {useRef, useState} from 'react';
import FavoritePlace from './FavoritePlace/FavoritePlace.js';

function SearchList ({marker, onFav, setOnFav, setFavPlace}){
  const placeRef = useRef()
  const onClick = () => {
    {setOnFav(!onFav)}
    {setFavPlace(placeRef.current.innerHTML)}
  }

  return(
    <>
      <div className="container" onClick={onClick}>
        <div ref={placeRef}>
          {marker.content}
        </div>
      </div>
    </>
  )
}

export default SearchList; 