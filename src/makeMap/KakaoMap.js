import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk"
import './KakaoMap.css'

function KakaoMap() {
  
  return (
    <Map
      center={{ lat: 37.508889538403885, lng: 126.88696767750605 }}
      style={{ width: "100%", height: "100vh" }}
      level={3}
    >
      <MapMarker position={{
        lat: 37.508889538403885,
        lng: 126.88696767750605}}
        image={{
          src: "https://www.schooldots.me/static/media/logo.40dedad5a86b7b8f66504315e68cd6d6.svg",
          size: {
            width: 55,
            height: 40,
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
      <MapInfoWindow // 인포윈도우를 생성하고 지도에 표시합니다
        position={{
          // 인포윈도우가 표시될 위치입니다
          lat: 37.508889538403885,
          lng: 126.88696767750605,
        }}
        removable={true} // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
      >
        {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
        <div style={{width:"100%", textAlign: "center", padding: "5px", color: "#000" }}>스쿨닷츠</div>
      </MapInfoWindow>
    </Map>
  );
}

export default KakaoMap;