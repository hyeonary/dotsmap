import KakaoMap from "./KakaoMap";
import PlaceSearch from "./PlaceSearch";
import SearchButton from "./SearchButton";

function MakeMapPage(){
    
    return(
        <>
            <PlaceSearch></PlaceSearch>
            <KakaoMap></KakaoMap>
            <SearchButton></SearchButton>
        </>
    )
}

export default MakeMapPage;