import React from "react"
import { useState,useEffect } from "react";
import UseFetch from "../../UseFetch";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { data: items, loading, error } = UseFetch('/api/items');
    const [filteredItems, setFilteredItems] = useState([]);
    const [query,setQuery] = useState('')
  
    useEffect(() => {
        if (items) {
            setFilteredItems(items); // Initialize with all items
        }
    }, [items]);
  
    const handleSearch = (e) =>{
        const input = e.target.value.toLowerCase();
        setQuery(input);

        const sortedItems = items.filter((item => item.name.toLowerCase().includes(input)))
                            .sort((a,b) =>{
                                const aIndex = a.name.toLowerCase().indexOf(input);
                                const bIndex = b.name.toLowerCase().indexOf(input);

                                return aIndex - bIndex;
                            });
      setFilteredItems(sortedItems)
    }
    return (
        <div>

        
            
   <div className="navbar">
   <h1>Buy And Sell Comrade Price</h1>
   <input type="text"
               value={query}
               onChange={handleSearch}
               placeholder="Search for an item.."
             />
              <Link to='/post' target="_blank"> <button>Post Here</button></Link>
   </div>

 

            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {items && (
                <div className="item-container">
                    {items && filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                           
                            <div key={item._id} className="items">
                                 <Link to={`/items/${item._id}`}>
                                <img src={item.image} alt="" />
                                <h2>{item.name}</h2> 
                                <h3>Sh.{item.price}</h3>
                                <h4>{item.location}</h4>
                                
                
            </Link>

                            </div>
                        ))
                    ):(
                        <p>No results found!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
