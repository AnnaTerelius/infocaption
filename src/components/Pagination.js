import React, {useState} from 'react';

const Pagination = ({data, message}) => {
    const pageNumbers = [];
    const [page, setPage] = useState(1);
    const [showNewPage, setShowNewPage] = useState({});

    const pageNumber = async (event) => {
        event.preventDefault()
        console.log('event pageNumber= när man klickar på siffran ska man anropa API')
        
        fetch('https://support.infocaption.com/API/lucene/guidesearch?<searchQuery>&hitsPerPage=9&page=' +page, '+&searchQuery=' +message,{
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
            setShowNewPage(myJson);
            
          });
    
          
      }

    

    for (let i = 1; i <= Math.ceil(data.totalHits / data.hitsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <p>PAGINATION COMPONENT</p>
                {pageNumbers.map((number) => (  
                    <button className="btn"  type="submit" onClick={pageNumber}>
                        {number}
                    </button>
                    
                ))}
           
        </div>
    )

}

export default Pagination;