import { useContext, useEffect } from "react";
import React from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from 'react-router-dom';
import StarRating from "./StarRating";

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response);
                setRestaurants(response.data.data.restaurants);
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter((rest) => {
                return rest.id !== id;
            }));
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    }

    const handleSelect = (id) => {
        navigate(`/restaurants/${id}`);
    }

    const renderRating = (rest) => {
        if (!rest.count) {
            return (<span className="text-warning">0 Reviews</span>);
        }
        return (
            <>
                <StarRating rating={rest.average_rating} />
                <span className="text-warning ml-1">({rest.count})</span>
            </>
        );
    }

    return (
        <div className="list-group">
            <table className="table table-dark table-hover">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(rest => {
                        return (
                            <tr key={rest.id} onClick={() => handleSelect(rest.id)}>
                                <th scope="row">{rest.name}</th>
                                <td>{rest.location}</td>
                                <td>{"$".repeat(rest.price_range)}</td>
                                <td>{renderRating(rest)}</td>
                                <td>
                                    <button onClick={(e) => handleUpdate(e, rest.id)} className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    <button onClick={(e) => handleDelete(e, rest.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
