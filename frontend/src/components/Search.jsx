import react, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import reactDom from "react-dom";
import axios from "axios";
import "../styles/search.css";
import cards from "./cards";
// const Search = () => {
//     return (
//         <section>
//             <input
//                 type = 'text'
//                 nmae='search'
//                 value={}
//                 }
//                 >

//             </input>
//         </section>
//     );
// }

let orignalWorkers = [];

const Card = (props) => {
  const [workers, setWorkers] = useState([]);
  const [workerID, setWorkerID] = useState();
  useEffect(() => {
    axios
      .get("/data")
      .then((res) => {
        setWorkers(res.data);
        orignalWorkers = res.data;
      })
      .catch((error) => console.log(error));
  }, []);

  const search = (e) => {
    // if (e.target.value.length === 0) {
    //   setWorkers(orignalWorkers);
    //   return;
    // }
    const newWorkers = orignalWorkers.filter((item) =>
      item.name.includes(e.target.value)
    );
    setWorkers(newWorkers);
  };

  return (
    <section className="cards">
      <div>
        <input type="text" onChange={(e) => search(e)}></input>
      </div>
      {workers.map((worker, key) => {
        return (
          <div className="card-sec">
            <div className="card">
              <img
                src={
                  "https://p.kindpng.com/picc/s/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent.png"
                }
                className="card-img"
              />
              <div className="card-info">
                <span className="card-category card-color">
                  {worker.location.toUpperCase()}
                </span>
                <h3 className="card-title">{worker.name}</h3>
                <span className="card-category">{worker.phoneNo}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="card-category card-color ">
                  {worker.price}
                </span>
                <br />
                <br />
                <Link
                  to={{
                    pathname: "/bookingProfile",
                  }}
                >
                  <button
                    onClick={() => {
                      console.log(worker._id);
                      localStorage.setItem("id", worker._id);
                    }}
                  >
                    BOOK
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default Card;
