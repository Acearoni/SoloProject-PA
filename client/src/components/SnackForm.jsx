import React, { useState } from 'react';
import axios from 'axios';
import '../SnackForm.css';

const SnackForm = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});

    const validateCode = (code) => {
        // expression to validate if the code contains exactly two characters
        // and consists of valid button codes (A-F) or numbers (0-9)
        const regex = /^[A-F0-9]{2}$/i;
        return regex.test(code);
    };
    const checkCodeExistence = async (code) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/findSnackByCode/${code}`);
            return !!response.data;
        } catch (error) {
            return false;
        }
    };


    const submitHandler = (e) => {
        e.preventDefault();
    
        // Initialize an object to store errors
        const newErrors = {};
    
        // Validate the code format
        if (!validateCode(code)) {
            newErrors.code = 'Invalid code: Code must be exactly two characters long and contain valid button characters (A-F) or numbers (0-9).';
        }
    
        // Check if the price is greater than 0
        if (price <= 0) {
            newErrors.price = 'Price must be greater than 0.';
        }
    
        // Check if the name is empty
        if (!name) {
            newErrors.name = 'Name is required.';
        }
    
        // Check if the code already exists in the database
        checkCodeExistence(code)
            .then((exists) => {
                if (exists) {
                    newErrors.code = 'Code already exists.';
                }
    
                // If there are any errors, set them and return
                if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    return;
                }
    
                // If there are no errors, create the new snack
                const newSnack = { name, code, price };
    
                axios.post('http://localhost:8000/api/createSnack', newSnack)
                    .then((res) => {
                        console.log(res);
                        // Redirect back to home page after successful submission
                        window.location = '/';
                    })
                    .catch((err) => {
                        console.error(err);
                        setErrors(err.response.data.errors);
                    });
            });
    };

    return (
        <div className='parent-container'>
            <div className="snack-form-container">
                <h2>Create Snack</h2>
                <form onSubmit={submitHandler}>
                    <div className="form-field">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div className="form-field">
                        <label>Code:</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        {errors.code && <p className="error-message">{errors.code}</p>}
                    </div>

                    <div className="form-field">
                        <label>Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price && <p className="error-message">{errors.price}</p>}
                    </div>

                    <button className="submit-button" type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    );
};

export default SnackForm;
