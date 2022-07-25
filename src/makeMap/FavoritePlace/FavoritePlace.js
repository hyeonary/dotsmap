import './FavoritePlace.css'
import {useState, useRef} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk'


function FavoritePlace({setMarkers, reason, placeList, setPlaceList, setNewPlaces, favPlace, setOnFav, setReason, newPlaces}){
  const {kakao} = window;
  const starRef = useRef();
  const heartRef = useRef();

  const inputChange = (e) => {
    setReason(e.target.value)
  }

  const placeSubmit = (e) => {
    e.preventDefault()
    setOnFav(false);
    setMarkers([]);

    let userpicture=''
    if(heartRef.current.className == "clicked"){
      userpicture="image/vector.png"} else {
      userpicture="image/star.png"
    }

    const 위치정보 = new kakao.maps.services.Places()
    위치정보.keywordSearch(favPlace, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK){
        const 좌표 = new kakao.maps.LatLngBounds()
        
        const newUserPlace = newPlaces.slice() // mutate로 관리
        newUserPlace.push({
        position: {lat: data[0].y, lng: data[0].x,},
        content: data[0].place_name,
        description: reason,
        picture: userpicture
        })
        
        setNewPlaces(newUserPlace)
        console.log(newPlaces)
        console.log(newUserPlace)
      }
    })
    }

  return (
    <>
      <div className="favcontainer">
        <div className="favorite">
          <p style={{fontSize: "20px"}}>{favPlace}</p>
        </div>
        <div className="whyplace">
          <p style={{fontSize: "18px"}}></p>
          <form className="placeform" onSubmit={placeSubmit}>
            <input className="reason" type="text" onChange={inputChange}
              placeholder='이 장소가 특별한 이유를 적어주세요'></input>
              <div className="choosemarker">
                <button className="marker" type="button" ref={starRef} 
                  onClick={()=>{
                    starRef.current.className = "clicked"
                    heartRef.current.className = "marker"
                  }}>
                  <img src="image/star.png" width="50px" />
                </button>
                <button className="marker" type="button" ref={heartRef}
                  onClick={()=>{
                    heartRef.current.className = "clicked"
                    starRef.current.className = "marker"
                  }}>
                  <img src="image/vector.png" width="55px" />
                </button>
              </div>
              <div className="buttoncontainer">
                <button type="submit">저장하기</button>
                <button type="button">닫기</button>
              </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default FavoritePlace

// 이미지랑 이유 가져오기