import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center h-b-N">
                <h1 style={{fontSize: "8rem", textShadow:'4px #000000'}}>Zwiggy</h1>
              </div>
              <p className="h-b-p">Welcome to the food plaza</p>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  style={{border: '2px solid red'}}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                  />
                {/* <button
                  className="btn btn-outline-danger text-black bg-danger"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(55%)", height:"550px", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(55%)", height:"550px", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?biryani"
                className="d-block w-100"
                style={{ filter: "brightness(55%)", height:"550px", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?steak"
                className="d-block w-100"
                style={{ filter: "brightness(5%)", height:"550px", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?curry"
                className="d-block w-100"
                style={{ filter: "brightness(55%)", height:"550px", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?pastry cake"
                className="d-block w-100"
                style={{ filter: "brightness(55%)", height:"550px", objectFit: "fill" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="mt-3 container">
        <h1 className="mb-2 text-center text-danger">Our Menu</h1>
        <hr className="d-flex" style={{color:"red", height:"1.5px", width:"50%", marginLeft:'25%'}} />
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-2 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem = {filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div> No Such Data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>''''''''''''''''</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
