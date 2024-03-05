import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpdateSnack.css';

const UpdateSnackForm = () => {
    const { id } = useParams();
    const [snack, setSnack] = useState(null);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/findOneSnack/${id}`)
            .then((res) => {
                const { name, code, price } = res.data;
                setSnack(res.data);
                setName(name);
                setCode(code);
                setPrice(price);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    // Function to validate the code format
    const validateCode = (code) => {
        const regex = /^[A-F0-9]{2}$/i;
        return regex.test(code);
    };

    // Function to validate the price
    const validatePrice = (price) => {
        return price > 0;
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Initialize an object to store errors
        const newErrors = {};

        // Validate the code format
        if (!validateCode(code)) {
            newErrors.code = 'Invalid code: Code must be exactly two characters long and contain valid button characters (A-F) or numbers (0-9).';
        }

        // Check if the price is greater than 0
        if (!validatePrice(price)) {
            newErrors.price = 'Price must be greater than 0.';
        }

        // Check if the name is empty
        if (!name) {
            newErrors.name = 'Name is required.';
        }

        const checkCodeExistence = async (code) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/findSnackByCode/${code}`);
                return response.data !== null;
            } catch (error) {
                console.error(error);
                return false;
            }
        };

        if (code !== snack.code) {
            const exists = await checkCodeExistence(code);
            if (exists) {
                newErrors.code = 'Code already exists.';
            }
        }

        // If there are any errors, set them and return
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }



        // If there are no errors, update the snack
        try {
            await axios.put(`http://localhost:8000/api/updateSnack/${id}`, { name, code, price });
            // Redirect back to home page after successful update
            window.location = '/';
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/deleteSnack/${id}`);
            // Redirect back to home page after successful deletion
            window.location = '/';
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="parent-container">
            <div className="snack-form-container">
                <h1>Update Snack</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    <div className="form-field">
                        <label htmlFor="code">Code:</label>
                        <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
                        {errors.code && <p className="error-message">{errors.code}</p>}
                    </div>
                    <div className="form-field">
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        {errors.price && <p className="error-message">{errors.price}</p>}
                    </div>
                    <div className='buttons-together'>
                    <button type="submit" className='update-button'>Update</button>
                    <button type="button"className='delete-button' onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSnackForm;
