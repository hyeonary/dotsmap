import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import './KakaoMap.css'

function KakaoMap() {
  
  return (
    <div>
      <Map center={{ lat: 37.508889538403885, lng: 126.88696767750605 }}
        style={{ width: "100%", height: "100vh" }}
        level={3}
      > 
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
    </div>
  );
}

export default KakaoMap;