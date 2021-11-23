import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");
    const { id } = useParams();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name, review: reviewText, rating
            });
            navigate("/");
            navigate(`/restaurants/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name" id="name" />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select id="rating" className="custom-select" value={rating} onChange={e => setRating(e.target.value)}>
                            <option disabled default>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea id="review" cols="30" rows="10" className="form-control" value={reviewText} onChange={e => setReviewText(e.target.value)}></textarea>
                </div>
                <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddReview;
