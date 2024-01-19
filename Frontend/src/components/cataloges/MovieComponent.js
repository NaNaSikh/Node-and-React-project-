import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { Link } from "react-router-dom";

const MovieComponent = () => {
    const [ticket, setTicket] = useState([]);

    useEffect(() => {
        getTicket();
    }, []);

    const getTicket = async () => {
        try {
            let result = await fetch("http://localhost:5000/getMovieTickets");
            result = await result.json();
            setTicket(result);
           
        } catch (error) {
            console.error("Error fetching movie tickets:", error);
        }
    }
    console.log(ticket);
    return (
        <>
            <div className="col-components">
                <div className="components">Movies</div>
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
                                    <li>Tickets left : {item.numberOfSeats}</li>
                                    <li>Price: {item.price}</li>
                                </ul>
                                
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MovieComponent;
