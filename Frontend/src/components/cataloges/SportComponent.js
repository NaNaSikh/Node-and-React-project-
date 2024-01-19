import React  , {useEffect , useState}from "react";
import { Link } from "react-router-dom";

const SportComponent = () => {
    const [ticket , setTicket] = useState([]);
    useEffect(()=>{
        getTicket();
    }, []);

    const getTicket = async () => {
        let result = await fetch("http://localhost:5000/getSportTickets");
        result = await result.json();
        setTicket(result);
    }

    console.warn(ticket);
    return(
        <>
        <div className="col-components">
            <div className="components">Sport</div>
            <div className="row">
                {ticket.map((item, index) => (
                        <Link to={{
                            pathname: `/ticket/${item._id}`,
                            search: `?category=${item.category}`, 
                            state: { customProperty: "exampleValue" }
                          }} key={index}>
                            <div className={`col-sm ${index % 3 === 0 ? 'mb-3' : ''}`}>
                                <ul>
                                    <li className="nameOfEvent">{item.eventName}</li>
                                    <li>{item.description}</li>
                                    <li>Tickets left: {item.numberOfSeats}</li>
                                    <li>Price{item.price}</li>
                                </ul>
                                {index % 3 === 2 && <div className="w-100"></div>}
                            </div>
                        </Link>
                    ))}
            </div>
            
            
        </div>

        </>
    )
}
 export default SportComponent;