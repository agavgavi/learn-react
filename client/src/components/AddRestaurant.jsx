import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price_range, setPriceRange] = useState("Price Range");
    const { addRestaurant } = useContext(RestaurantsContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await RestaurantFinder.post("/", {
                name, location, price_range
            });
            addRestaurant(resp.data.data.restaurant);
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Location" />
                    </div>
                    <div className="col">
                        <select value={price_range} onChange={e => setPriceRange(e.target.value)} className="custom-select mr-sm-1">
                            <option disabled >Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" onClick={e => handleSubmit(e)} className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
