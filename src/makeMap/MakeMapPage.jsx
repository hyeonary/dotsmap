import KakaoMap from "./KakaoMap";
import SearchButton from "./SearchButton";
import PlaceSearch from "./PlaceSearch";
import {useState} from 'react'
import './MakeMapPage.css'


function MakeMapPage(){
    const [inputPlace, setInputPlace] = useState(false);
    
    return(
        <>  
            {inputPlace == true &&
                <>
                <BgChange/>
                <PlaceSearch/>
                </>
            }
            <KakaoMap></KakaoMap>
            <SearchButton
                inputPlace={inputPlace}
                setInputPlace={setInputPlace}
            ></SearchButton>
        </>
    )
}

function BgChange(){
    return(
        <div className='bgchange'></div>
    )
}

export default MakeMapPage;
