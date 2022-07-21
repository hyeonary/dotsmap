import {useState, useEffect} from 'react'
import {Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk'
import SearchButton from './SearchButton';
import BgChange from './BgChange';
import PlaceSearch from './PlaceSearch';

function AddMarker (){
  const {kakao} = window; // window 있어야 지도 출력됨
   
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState()

  const [inputPlace, setInputPlace] = useState(false)
  const [searchPlace, setSearchPlace] = useState('스쿨닷츠')

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places() // 장소검색 서비스

    ps.keywordSearch(searchPlace, (data, status, _pagination) => {  
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map, searchPlace])

  console.log(searchPlace)

  return (
    <>
      {inputPlace == true &&
        <>
          <BgChange />
          <PlaceSearch searchPlace={searchPlace} setSearchPlace={setSearchPlace}
            inputPlace={inputPlace} setInputPlace={setInputPlace}
          />
        </>
      }
      <Map 
        center={{
          lat: 37.508889538403885,
          lng: 126.88696767750605
        }}
        style={{
          width: "100vw",
          height: "100vw",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info &&info.content === marker.content && (
              <div style={{color:"#000"}}>{marker.content}</div>
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
      ></SearchButton>
    </>
  )
}

export default AddMarker;