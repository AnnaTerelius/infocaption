import React, {useState} from 'react';
import './App.css';
import Pagination from './components/Pagination';
import logo from './logo1.svg';

function App() {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault()
    setLoading(true);
    
    fetch('https://support.infocaption.com/API/lucene/guidesearch?<searchQuery>&hitsPerPage=9&searchQuery=' +message,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson);
        setLoading(false);
      });   
  }
 

  return (
    <div className="App">
      <header className="App-header">
        <form className="search-container" onSubmit={handleSearch}>
          <div className="search-container">
            <input  className="search-field" type="text" placeholder="search" value={message} onChange={(event) => { setMessage(event.target.value) }}></input>
            <button className="btn" type="submit"> <img src={logo} alt="logo"/></button>
          </div>
        </form>
        </header>
        {Object.keys(data).length != 0 &&
           <ul className="list">
            {data.results.map((item) => (
              <a href={item.fullURL} target="_blank">
              <li className="list-item" key={item.id}><div className="list-name">{item.name}</div><div className="list-summary">{item.summary}</div><div className="details-container"><div>{item.lastModifiedDate}</div><div className="url-email-container"><div className="url-email">URL</div><a href={"mailto:?subject=" + item.name + "&body=" +item.fullURL} target="_blank"><div className="url-email">EMAIL</div></a></div></div></li></a>))}
           </ul>
            }
            <Pagination data={data} message={message} setData={setData}/>
    </div>
  );
}

export default App;
