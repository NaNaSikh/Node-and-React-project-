import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import ProfilePicture from "../icons/user64.png";

const Profile = () => {
    const auth = localStorage.getItem('user');
    const [myTickets, setMyTickets] = useState([]);
    
    useEffect(() => {
        const fetchMyTicketsFromServer = async () => {
         let authJson = JSON.parse(auth);
           let  userEmail =  authJson.email
           console.log(userEmail);
            try {
                const myTicketsResponse = await fetch(`http://localhost:5000/getMyTickets/${userEmail}`);
                let ticketsData = await myTicketsResponse.json();
                let myTicketsData = ticketsData.myTicket;
                let category = ticketsData.myTicketCategory;
                let ticketNum = ticketsData.ticketNumber;
                console.log(myTicketsData);

                const ticketDetailsPromises = myTicketsData.map(async (ticketId,index) => {
                    console.log(ticketId);
                    console.log(category[index])
                    let result;
                        switch (category[index]) {
                            case "movies":
                                result = await fetch(`http://localhost:5000/getMovieTicketDetails/${ticketId}`);
                                break;
                            case "sports":
                                result = await fetch(`http://localhost:5000/getSportTicketDetails/${ticketId}`);
                                break;
                            case "music":
                                result = await fetch(`http://localhost:5000/getMusicTicketDetails/${ticketId}`);
                                break;
                            default:
                                console.error("Invalid category");
                                return;
                        }

                        const allDetails = await result.json();

                        allDetails.number = ticketNum[index];

                        return allDetails;
                    
                });

                const ticketDetails = await Promise.all(ticketDetailsPromises);
                setMyTickets(ticketDetails);
            } catch (error) {
                console.error("Error fetching my tickets:", error);
            }
        };

        // Call the function to fetch my tickets when the component mounts
        fetchMyTicketsFromServer();
    }, []);
    return(
        <>
            <div className="profile" >
                        <div className="profile-container">
                        <img className="profile-picture"
                            src={ProfilePicture}
                            alt='profile image'
                        />
                         <MDBCardTitle className = "profile-name">Hello { JSON.parse(auth).name} </MDBCardTitle>
                        </div>
                        <div className="">
                           
                            <MDBCardText className = "profile-info">My Tickets </MDBCardText>
                            {myTickets.map((item, index) => (
                                    <div className={`col-sm ${index % 3 === 0 ? 'mb-3' : ''}`}>
                                        <ul>
                                            <li className="nameOfEvent">{item.eventName}</li>
                                            <li>Category: {item.category}</li>
                                            <li>Number of tickets: {item.number}</li>
                                        </ul>
                                        {index % 3 === 2 && <div className="w-100"></div>}
                                    </div>
                                
                            ))}

                        </div>
            </div>
        </>
    )
}
 export default Profile;