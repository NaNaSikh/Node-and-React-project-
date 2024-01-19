// import React from "react";
// import { Link } from "react-router-dom";

// const SideBar = () => {
//     return(
//         <div>
//             <ul className = "catalog-ul">
//                 <li><Link to="/movies">Movies </Link></li>
//                 <li><Link to="/music">Music</Link></li>
//                 <li><Link to="/sport">Sport</Link></li>
//             </ul>
//         </div>
//     )
// } 

// export default SideBar;

import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div>
            <ul className="catalog-ul">
                <li><Link to="/movies">Movies </Link></li>
                <li><Link to="/music">Music</Link></li>
                <li><Link to="/sport">Sport</Link></li>
            </ul>
        </div>
    )
}

export default SideBar;
