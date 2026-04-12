import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Task 2: Fetch gifts from the backend
        const fetchGifts = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGifts(data); // This uses setGifts!
            } catch (error) {
                console.error("Error fetching gifts:", error);
            }
        };
        fetchGifts();
    }, []);

    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`); // This uses navigate!
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={gift.image} className="card-img-top" alt={gift.name} />
                            <div className="card-body">
                                <h5 className="card-title">{gift.name}</h5>
                                <p className="card-text">{gift.condition}</p>
                                <p className="card-text text-muted">{formatDate(gift.date_added)}</p>
                                <button 
                                    onClick={() => goToDetailsPage(gift.id)} 
                                    className="btn btn-primary"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;