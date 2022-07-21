import {useState} from 'react';
import './PlaceSearch.css'

function PlaceSearch ({searchPlace, setSearchPlace, inputPlace, setInputPlace, placeList, setPlaceList}){

    const [inputText, setInputText] = useState('')
    //const [Place, setPlace] = useState('')
  
    const onChange = (e) => { // input에 들어간 값 가져오기
      setInputText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault() // 제출폼 리로드 방지
      {setSearchPlace(inputText)}
      setInputText('')
      {setInputPlace(!inputPlace)}
      {setPlaceList(!placeList)}
    }

    return(
            <div className="inputDiv">
                <form className="inputForm" onSubmit={handleSubmit}>
                    <input className="inputbox" placeholder="기억에 남는 장소가 있나요?" onChange={onChange} value={inputText} />
                    <button className="inputButton"
                     type="submit"
                     >검색</button>
                </form>
            </div>
    )
  }

export default PlaceSearch;