import {useState, useEffect, useRef} from 'react'
import {Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk'
import SearchButton from './SearchButton';
import BgChange from './PlaceInput/BgChange';
import PlaceSearch from './PlaceInput/PlaceSearch';
import SearchList from './SearchList';
import './AddMarker.css'
import FavoritePlace from './FavoritePlace/FavoritePlace';

function AddMarker (){
  const {kakao} = window; // window 있어야 지도 출력됨
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([]) // 키워드 바탕으로 검색된 좌표
  const [map, setMap] = useState()

  const [inputPlace, setInputPlace] = useState(false); // 인풋박스 on/off
  const [searchPlace, setSearchPlace] = useState(''); // 장소 검색
  const [placeList, setPlaceList] = useState(false); // 장소 검색 모달 on/off
  const [onFav, setOnFav]  = useState(false);
  const [favPlace, setFavPlace] = useState('');
  const clickFav = () => {
    setOnFav(!onFav)
  }

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places() // 장소검색 서비스

    ps.keywordSearch(searchPlace, (data, status, _pagination) => {  
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        // data에는 좌표, 이름 값이 들어있음
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: { lat: data[i].y,lng: data[i].x,}, 
            content: data[i].place_name, 
          })
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x)) 
        } 
        setMarkers(markers)
        map.setBounds(bounds) // 지도 표시해주는 것?
        console.log(bounds)
      }
    })
  }, [map, searchPlace])

  return (
    <>
      {inputPlace == true &&
        <>
          <BgChange />
          <PlaceSearch searchPlace={searchPlace} setSearchPlace={setSearchPlace}
            inputPlace={inputPlace} setInputPlace={setInputPlace}
            placeList={placeList} setPlaceList={setPlaceList}
          />
        </>
      }

      {onFav == true &&
        <>
          <FavoritePlace
            favPlace={favPlace}
            setOnFav={setOnFav}
          >

          </FavoritePlace>
        </>

      }

      <Map center={{lat: 37.508889538403885,lng: 126.88696767750605}}
        style={{width: "100vw", height: "100vh",}}
        level={3}
        onCreate={setMap}
      >
        { 
          placeList == true ? 
            <div className="placecontainer">
            {markers.map((marker) => (       
              <SearchList
                setFavPlace={setFavPlace}
                marker={marker}
                onFav={onFav}
                setOnFav={setOnFav}
              ></SearchList>
            ))
            }
            <button className="closeContainer" 
              onClick={(()=>{setPlaceList(!placeList)
              setMarkers([])
              setOnFav(false)
              })}
            >닫기</button>
            </div> : 
          null
        }
        
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
          >
          </MapMarker>
        ))}

        {markers.map((marker) => (
          <CustomOverlayMap 
            position={marker.position}
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          >
            <div className="nametag"
              style={{padding:"6px", 
              backgroundColor:"#fff", 
              color:"#000",
              borderRadius: "15px"
              }}
            >
            {marker.content}
            </div>
          </CustomOverlayMap>
        ))}

        <CustomOverlayMap 
          position={{ 
            lat: 37.508889538403885,
            lng: 126.88696767750605
          }}
        >
          <div className="realdots"
            style={{padding:"9px", 
            backgroundColor:"#5e62db", 
            color:"#fff",
            borderRadius: "15px"
            }}
          >
            Dots
          </div>
        </CustomOverlayMap>
        <MapMarker
            className="dotsmarker"
            position={{
            lat: 37.508889538403885,
            lng: 126.88696767750605}}
            image={{
              src: "https://www.schooldots.me/static/media/logo.40dedad5a86b7b8f66504315e68cd6d6.svg",
              size: {
                width: 48,
                height: 35,
              }, // 마커이미지의 크기
              options: {
                offset: {
                  x: 15,
                  y: 69,
                }, // 마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정함.
              },
            }}
          >
        </MapMarker>  
      </Map>
      <SearchButton
        inputPlace={inputPlace}
        setInputPlace={setInputPlace}
        markers={markers}
        setMarkers={setMarkers}
        setPlaceList={setPlaceList}
      ></SearchButton>
    </>
  )
}

export default AddMarker;