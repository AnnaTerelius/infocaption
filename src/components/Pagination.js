import React, {useState} from 'react';

const Pagination = ({data, message, setData}) => {
    const pageNumbers = [];
    const [page, setPage] = useState(1);
    const [showNewPage, setShowNewPage] = useState({});

    const pageNumber = async (event) => {
        event.preventDefault()
        console.log('event pageNumber= när man klickar på siffran ska man anropa API')
        console.log(page)
        const URL = 'https://support.infocaption.com/API/lucene/guidesearch?<searchQuery>&hitsPerPage=9&page=' +page+ '&searchQuery=' +message
        console.log(URL)

        fetch(URL,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           }
        }).then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setData(myJson);
          });   
      }

    
    for (let i = 1; i <= Math.ceil(data.totalHits / data.hitsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <p>PAGINATION COMPONENT</p>
            <form onSubmit={pageNumber}>
                {pageNumbers.map((number) => (  
                    <button className="btn"  type="submit" onClick={() => setPage(number)}>
                        {number}
                    </button>
                ))}
            </form>
        </div>
    )
}

export default Pagination;