import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap-grid.min.css';

const TicketDetails = () => {
    const { id } =  useParams()
    const [ticketDetails, setTicketDetails] = useState("");
    const location = useLocation();
    const customProperty = location.state ? location.state.customProperty : null;
    const category = new URLSearchParams(location.search).get("category");

    const [numberOfTickets, setNumberOfTickets] = useState(0);

    const handleNumberOfTicketsChange = (e) => {
        // Ensure the entered value is a positive integer
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setNumberOfTickets(value);
    };

    const auth = localStorage.getItem('user');


    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                let result;
                switch (category) {
                    case "movies":
                        result = await fetch(`http://localhost:5000/getMovieTicketDetails/${id}`);
                        break;
                    case "sports":
                        result = await fetch(`http://localhost:5000/getSportTicketDetails/${id}`);
                        break;
                    case "music":
                        result = await fetch(`http://localhost:5000/getMusicTicketDetails/${id}`);
                        break;
                    default:
                        console.error("Invalid category");
                        return;
                }
                result = await result.json();
                setTicketDetails(result);
            } catch (error) {
                console.error("Error fetching ticket details:", error);
            }
        }

        fetchTicketDetails();
    }, [id, category]);

    const buyTicket = async () =>{
        let totalPrice = ticketDetails.price * numberOfTickets ;
        const isConfirmed = window.confirm(`Do you want to buy this ticket(s)? yout total is ${totalPrice}`);

        if (isConfirmed) {
            let authJson = JSON.parse(auth);
            let  userEmail =  authJson.email

            const ticketData = {
            ticketId: id, // Replace with the actual ticket ID
            category: category, // Replace with the actual category
            number: numberOfTickets, // Replace with the actual number of tickets
            };

            try {
                
            const response = await fetch(`http://localhost:5000/addTicket/${userEmail}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(ticketData),
            });

      if (response.ok) {
        const result = await response.json();
        console.log("Ticket bought successfully:", result);
        changeNumberOfSeats(id,numberOfTickets);
            console.log("Ticket bought!");
        } 
     }  catch(error){
        window.alert("something went wrong try again");
     } 
    }else {
            console.log("Ticket purchase canceled");
        }
        
    }


    const changeNumberOfSeats = async (id, numberOfTickets) => {
        let numberOfSeats = ticketDetails.numberOfSeats - numberOfTickets; 
        console.log(numberOfSeats);
        try {
            let response;
            switch (category) {
                case "movies":
                     response = await fetch(`http://localhost:5000/changeMovieTicket/${id}`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ numberOfSeats }),
                    });                        break;
                case "sports":
                     response = await fetch(`http://localhost:5000/changeSportTicket/${id}`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ numberOfSeats }),
                    });                        break;
                case "music":
                     response = await fetch(`http://localhost:5000/changeMusicTicket/${id}`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ numberOfSeats }),
                    });                        break;
                default:
                    console.error("Invalid category");
                    return;
            }
        
      
          if (response.ok) {
            const result = await response.json();
            console.log("Ticket changed successfully:", result);
          } else {
            console.error("Failed to change ticket:", response.statusText);
          }
        } catch (error) {
          console.error("Error changing ticket:", error);
        }
      };
      
    

    return (
        <>
        
            <div className="col-components">
               
                {ticketDetails ? (
                    <div>
                     <div className="components">{ticketDetails.eventName}</div>
                        <ul className="details">
                            <li>Description: {ticketDetails.description}</li>
                            <li>Tickets left: {ticketDetails.numberOfSeats}</li>
                            <li>Price: {ticketDetails.price}</li>
                            <li>
                                <label htmlFor="numberOfTickets">Number of Tickets:</label>
                                <input className="details-input"
                                    type="number"
                                    id="numberOfTickets"
                                    name="numberOfTickets"
                                    value={numberOfTickets}
                                    onChange={handleNumberOfTicketsChange}
                                />
                            </li>
                            <button className="details-button" onClick={buyTicket}>Buy Ticket</button>
                        </ul>
                    </div>
                ) : (
                    <p>Loading ticket details...</p>
                )}
            </div>
        </>
    );
}

export default TicketDetails;
