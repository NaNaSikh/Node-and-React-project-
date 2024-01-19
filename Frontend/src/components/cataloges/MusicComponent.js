import React  , {useEffect , useState}from "react";
import SideBar from "../SideBar.js";
import { Link } from "react-router-dom";

const MusicComponent = () => {
    const [ticket , setTicket] = useState([]);
    useEffect(()=>{
        getTicket();
    }, []);

    const getTicket = async () => {
        let result = await fetch("http://localhost:5000/getMusicTickets");
        result = await result.json();
        setTicket(result);
    }

    console.warn(ticket);

    return(
        <>
        <div className="col-components">
            <div className="components">Music</div>
            <div className="row">
                {ticket.map((item, index) => (
                    <Link to={{
                        pathname: `/ticket/${item._id}`,
                        search: `?category=${item.category}`, // Add category as a query parameter
                        state: { customProperty: "exampleValue" }
                      }} key={index}>
                        <div className={`col-sm ${index % 3 === 0 ? 'mb-3' : ''}`}>
                            <ul>
                                <li className="nameOfEvent">{item.eventName}</li>
                                <li>{item.description}</li>
                                <li>Tikets left: {item.numberOfSeats}</li>
                                <li>Price: {item.price}</li>
                            </ul>
                            {index % 3 === 2 && <div className="w-100"></div>}
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* <div className="row">
                <div className="col-sm">Some Text</div>
                <div className="col-sm">Some Text</div>
                <div className="col-sm">Some Text</div>
                <div className="col-sm">Some Text</div>
            </div>
            <div className="row">
                <div className="col-sm">Some Text</div>
                <div className="col-sm">Some Text</div>
                <div className="col-sm">Some Text</div>
                <div className="col-sm">Some Text</div>
            </div> */}
        </div>

        </>
    )
}
 export default MusicComponent;