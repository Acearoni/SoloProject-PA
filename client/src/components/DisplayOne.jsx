import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ViewOne.css';

const DisplayOne = ({ code }) => {
    // State to store the snack data
    const [snack, setSnack] = useState(null);
    // State to track loading state
    const [loading, setLoading] = useState(true);
    // State to track error state
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
        <div>
            <h2>{snack.name},  Price: {snack.price} </h2>

            {/* Add more details if needed */}
        </div>
    );
};

export default DisplayOne;
