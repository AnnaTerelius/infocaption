import React, {useState, useEffect} from 'react';
import './App.css';
import logo from './logo1.svg';

function App() {

  const [data, setData] = useState({})
  const [message, setMessage] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()
    console.log('event handleSearch= när man klickar på knappen ska man anropa API')
    
    fetch('https://support.infocaption.com/API/lucene/guidesearch?<searchQuery>&hitsPerPage=9&searchQuery=' +message,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });

      
  }
  /*
  useEffect(()=>{
    handleSearch()
  },[])*/
 


 


  return (
    <div className="App">
      <header className="App-header">
        <form className="search-container" onSubmit={handleSearch}>
          <div className="search-container">
            <input required className="search-field" type="text" placeholder="search" value={message} onChange={(event) => { setMessage(event.target.value); console.log("event onChange: Texten är " + event.target.value) }}></input>
            <button className="btn"  type="submit"> <img src={logo} alt="logo" /></button>
            {console.log(message)}
            {console.log(data +"json som jag sätter i setdata")}
          </div>
        </form>
         
        {data.length > 0 && 
           <ul className="list">
           {data.map((item) => (
             <li ><button type="button" className="paginator" >{item}</button></li>))}
           </ul>
           }
          {console.log(data.results +"rad 58")} 
      </header>
    </div>
  );
}

<div>
</div>

export default App;
