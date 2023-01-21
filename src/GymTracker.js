import React, {useState} from 'react';
import Calendar from 'react-calendar';

const Day = ({date, onClick}) => {
    const handleButtonClick = (e) => {
        onClick(date);
        e.button.className="selected-date";
    }
    return (
        <button onClick={handleButtonClick} >{date.getDate()}</button>
    )
}

function GymTracker() {
    const [selectedDates, setSelectedDates] = useState(new Set());

    const handleClick = (date) => {
        const timestamp = date.getTime();
        if (selectedDates.has(timestamp)) {
            selectedDates.delete(timestamp);
            setSelectedDates(new Set(selectedDates));
        } else {
            selectedDates.add(timestamp);
            setSelectedDates(new Set(selectedDates));
        }
    }
    return (
        <div>
            <Calendar
                onClickDay={handleClick}
                day={(props) => <Day {...props} onClick={handleClick}/>}
            />
            <p>Number of days in the gym: {selectedDates.size}</p>
        </div>
    );
}

export default GymTracker

