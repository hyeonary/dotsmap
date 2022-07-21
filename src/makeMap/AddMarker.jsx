import {useState, useEffect, useRef} from 'react'
import {Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk'
import SearchButton from './SearchButton';
import BgChange from './BgChange';
import PlaceSearch from './PlaceSearch';
import SearchList from './SearchList';
import './AddMarker.css'

function AddMarker (){
  const {kakao} = window; // window 있어야 지도 출력됨
   
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([]) // 키워드 바탕으로 검색된 좌표
  const [map, setMap] = useState()

  const [inputPlace, setInputPlace] = useState(false); // 인풋박스 on/off
  const [searchPlace, setSearchPlace] = useState('스쿨닷츠'); // 장소 검색
  const [placeList, setPlaceList] = useState(false) // 장소 검색 모달 on/off
  const placeRef = useRef();

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places() // 장소검색 서비스

    ps.keywordSearch(searchPlace, (data, status, _pagination) => {  
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        // data에는 좌표, 이름 값이 들어있음
        const bounds = new kakao.maps.LatLngBounds() // 검색할 사각형 영역
        let markers = []

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: { // position은 좌표를 뜻함
              lat: data[i].y,
              lng: data[i].x,
            }, 
            content: data[i].place_name, // content는 이름을 뜻함
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x)) // 중심 좌표
        } // 인수로 주어진 좌표를 포함하도록 영역 정보를 확장한다.
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds) // 지도 표시해주는 것?
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

      <Map  // 지도 표시 
        center={{
          lat: 37.508889538403885,
          lng: 126.88696767750605
        }}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        level={3}
        onCreate={setMap}
      >

        { // 장소 리스트 모달 띄우기
          placeList == true ? 
            <div className="placecontainer">
            {markers.map((marker) => (       
              <SearchList
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                markers={markers} 
                marker={marker}
                setInfo={setInfo}
                info={info}
              ></SearchList>
            ))
            }
            <button className="closebutton" 
              onClick={(()=>{setPlaceList(!placeList)
              setMarkers([])
              })}
            >닫기</button>
            </div> : 
          null
        }
        
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div className="maptag"
              style={{padding:"6px", 
              backgroundColor:"#fff", 
              color:"#000",
              borderRadius: "15px"
              }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}

        <CustomOverlayMap 
          position={{ 
            lat: 37.508889538403885,
            lng: 126.88696767750605
          }}
        >
          <div className="dotstag"
            style={{padding:"6px", 
            backgroundColor:"#fff", 
            color:"#000",
            borderRadius: "15px"
            }}
          >
          닷츠
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