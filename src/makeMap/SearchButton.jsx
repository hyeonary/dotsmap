import './SearchButton.css';

function SearchButton ({inputPlace, setInputPlace, setPlaceList}){
  const onClick = () => {
    {setInputPlace(!inputPlace)}
    {setPlaceList(false)}
  }

    return(
        <div className='inputwrap'>
            <div className='buttondiv'>
                <button 
                  className='searchbutton'
                  style={{color: "white"}}
                  onClick={onClick}
                >장소 추가하기</button>
            </div>
        </div>
    )
}

export default SearchButton; 