import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';

function DetailsPage() {
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGift = async () => {
            const baseUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${baseUrl}/api/gifts/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setGift(data);
            }
        };
        fetchGift();
    }, [productId]);

    if (!gift) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
            <div className="card shadow">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={gift.image} className="img-fluid rounded-start" alt={gift.name} />
                    </div>
                    <div className="col-md-6 p-4">
                        <h2>{gift.name}</h2>
                        <span className="badge bg-primary mb-3">{gift.category}</span>
                        <p className="lead">{gift.description}</p>
                        <p><strong>Condition:</strong> {gift.condition}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;