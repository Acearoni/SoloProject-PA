import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ViewOne.css';

const DisplayOne = ({ code }) => {
    const [snack, setSnack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch snack data based on the code
    const fetchSnackByCode = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/findSnackByCode/${code}`);
            setSnack(response.data);
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // If snack is not found, set snack to null and set loading to false
                setLoading(true);
            } else {
                // If there is an error other than 404 (e.g., network error), log the error
                console.error('Error fetching snack:', error);
            }
        }
    };

    useEffect(() => {
        fetchSnackByCode();
    }, [code]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Snack not found</div>;
    }

    return (
        <div className='one-adjust'>
            <h2>{snack.name},  Price: {snack.price.toFixed(2)} </h2>
        </div>
    );
};

export default DisplayOne;
