import './SearchList.css'

function SearchList ({markers, marker, setInfo}){
  return(
      <div className="container"
        onClick={() => {setInfo({marker})}}
      >
        <div>{marker.content}</div>
      </div>
  )
}

export default SearchList; 