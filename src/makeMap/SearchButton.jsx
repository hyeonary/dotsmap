import PlaceSearch from "./PlaceSearch";
import './SearchButton.css'

function SearchButton (){

    return(
        <div className='buttondiv'>
            <button 
                className='searchbutton'
                style={{color: "white"}}
                >장소 추가하기</button>
        </div>
    )
}

export default SearchButton; 