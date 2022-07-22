import './FavoritePlace.css'


function FavoritePlace({favPlace, setOnFav}){
  
  return (
    <>
      <div className="favcontainer">
        <div className="favorite">
          <p style={{fontSize: "22px"}}>{favPlace}</p>
        </div>
        <div className="whyplace">
          <p>선택한 이유</p>
          <input className="reason">
          </input>
        </div>
        <div className="choosemarker">
          <div className="star">
            <img src="image/star.png" width="50px"
            height="50px" />
          </div>
          <div className="heart">
            <img src="image/vector.png" width="50px"
            height="50px" />
          </div>
        </div>
        <div className="place">
          <button>등록</button>
          <button 
            onClick={() => {setOnFav(false)}}
          >닫기</button>
        </div>
      </div>
    </>

  )
}

export default FavoritePlace