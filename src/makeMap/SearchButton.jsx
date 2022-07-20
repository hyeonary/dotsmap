import './SearchButton.css'

function SearchButton ({onInput, setOnInput}){
    const onClick = () => {
        {setOnInput(!onInput)}
    }

    return(
        <div className='buttondiv'>
            <button 
                className='searchbutton'
                style={{color: "white"}}
                onClick={onClick}
                >장소 추가하기</button>
        </div>
    )
}

export default SearchButton; 