import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../SnackTable.css';


const DisplayAll = () => {
    const [snacks, setSnacks] = useState([]);
    //Declare our const of snacks, setSnacks within a list,
    //since we are listing all of the snacks in the DB.


    useEffect(() => {
        axios.get(`http://localhost:8000/api/allSnacks`)
            .then((res) => {
                setSnacks(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

    return (
        <div className="display-all-container">
            <h1 className='all-header'>Display All Snacks</h1>
            <table className="snack-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {snacks.map((snack) => (
                        <tr key={snack._id}>
                            <td>{snack.name}</td>
                            <td>{snack.code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default DisplayAll;
