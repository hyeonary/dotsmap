import {useState} from 'react';
import './PlaceSearch.css'

function PlaceSearch (){

    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')
  
    const onChange = (e) => {
      setInputText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setPlace(InputText)
      setInputText('')
    }

    return(
            <div className="inputDiv">
                <form className="inputForm" onSubmit={handleSubmit}>
                    <input className="inputbox" placeholder="장소를 입력하세요" onChange={onChange} value={InputText} />
                    <button className="inputButton" type="submit">검색</button>
                </form>
            </div>
    )
  }

export default PlaceSearch;