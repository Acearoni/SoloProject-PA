import React, { useState, useEffect } from 'react';
import '../VendorStyle.css';
import { Link } from 'react-router-dom';
import DisplayOne from './DisplayOne'; // Import the DisplayOne component
import DisplayAll from './DisplayAll';

function VendingMachine() {
    const [selectedLetter, setSelectedLetter] = useState(null); // State to store the selected letter
    const [selectedNumber, setSelectedNumber] = useState(null); // State to store the selected number
    const [displaySnack, setDisplaySnack] = useState(false); // State to control displaying the snack
    

    const buttons = [
        'A', 'B', 'C', 'D', 'E', 'F',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'CLR', 'ENT'
    ];

    const audio = new Audio('../sounds/BEEP.mp3')
    audio.volume = .1;

    useEffect(() => {
        audio.load(); // Load the audio file when the component mounts
    }, []);

    // Function to handle selection of a letter
    const handleLetterSelection = (letter) => {
        audio.play();
        setSelectedLetter(letter); // Update selected letter
    };

    // Function to handle selection of a number
    const handleNumberSelection = (number) => {
        audio.play();
        setSelectedNumber(number); // Update selected number
    };

    // Function to handle ENT button click
    const handleEntButtonClick = () => {
        if (selectedLetter && selectedNumber) {
            audio.play();
            // Set displaySnack to true to show the snack
            setDisplaySnack(true);
        } else {
            audio.play();
        }
    };

    // Function to handle CLR button click
    const handleClearButtonClick = () => {
        audio.play();
        setSelectedLetter(null); // Clear selected letter
        setSelectedNumber(null); // Clear selected number
        setDisplaySnack(false); // Hide displayed snack
    };


    return (
        <div className="container">
            <div className="vending-machine">
                <h1>Vending Machine</h1>
                <div className="buttons">
                    {buttons.map((code, index) => (
                        <button key={index} onClick={() => code === 'CLR' ? handleClearButtonClick() : code === 'ENT' ? handleEntButtonClick() : isNaN(code) ? handleLetterSelection(code) : handleNumberSelection(code)}>
                            {code}
                        </button>
                    ))}
                </div>
                <div className='add-snack-css'>
                    <Link to="/add-snack">PUT A SNACK IN THE MACHINE</Link>
                </div>
            </div>
            <div className="display-all-snacks">
                <DisplayAll/>
            <div className='snack-details'>
                {displaySnack && selectedLetter && selectedNumber && <DisplayOne code={`${selectedLetter}${selectedNumber}`} />}
            </div>
            </div>
        </div>
    );
}

export default VendingMachine;
