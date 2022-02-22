import React, {useState, useEffect} from 'react';
import './App.css';
import Pagination from './components/Pagination';
import logo from './logo1.svg';

function App() {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault()
    console.log('event handleSearch= när man klickar på knappen ska man anropa API')
    setLoading(true);
    
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
        setData(myJson);
        setLoading(false);
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
            <input  className="search-field" type="text" placeholder="search" value={message} onChange={(event) => { setMessage(event.target.value); console.log("event onChange: Texten är " + event.target.value) }}></input>
            <button className="btn"  type="submit"> <img src={logo} alt="logo" /></button>
            {console.log(message)}
            {console.log(data)}
          </div>
        </form>
        </header>
        {Object.keys(data).length != 0 &&
           <ul className="list">
            {data.results.map((item) => (
              <a href={item.fullURL} target="_blank">
              <li className="list-item" key={item.id}><div className="list-name">{item.name}</div><div className="list-summary">{item.summary}</div></li></a>))}
           </ul>
            }
            <Pagination data={data} message={message} setData={setData}/>
    </div>
  );
}

export default App;
