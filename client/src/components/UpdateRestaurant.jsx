import { useContext, useState, useEffect } from "react";
import React from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRestaurant = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    const { id } = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price_range, setPriceRange] = useState("Price Range");
    let navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                setName(response.data.data.restaurant.name);
                setLocation(response.data.data.restaurant.location);
                setPriceRange(response.data.data.restaurant.price_range);
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.put(`/${id}`, {
                name, location, price_range
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input id="location" value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <select id="price_range" value={price_range} onChange={e => setPriceRange(e.target.value)} className="custom-select mr-sm-1">
                        <option disabled >Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default UpdateRestaurant;
