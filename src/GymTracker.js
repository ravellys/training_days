import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import {deleteDate, fetchData, fetchUsers, insertDate} from './apiController';
import {convertDateSting, clickOnButton} from "./utils";


const okSymbol = <FontAwesomeIcon icon={faCheckCircle}/>;


function GymTracker() {
    const [selectedDates, setSelectedDates] = useState({});
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers(setUsers);
    }, []);

    useEffect(() => {
        if(users) { setUser(users[0]);}
    }, [users]);

    useEffect(() => {
        if (user) {
            fetchData(setSelectedDates, user);
        }
    }, [user]);

    useEffect(() => {
        if(selectedDates) {
            Array.from(document.getElementsByTagName("button")).forEach(button => clickOnButton(button, selectedDates));
        }
    }, [selectedDates]);

    const handleButtonClick = (date) => {
        const dateString = convertDateSting(date);
        const year = date.getFullYear();
        let yearDates = selectedDates[year] || new Set();
        if (yearDates.has(dateString)) {
            yearDates.delete(dateString);
            deleteDate(dateString, user);
        } else {
            yearDates.add(dateString);
            insertDate(dateString, user);
        }
        setSelectedDates({...selectedDates, [year]: yearDates});
    };

    const handleDayContent = (date, view) => {
        const year = date.getFullYear();
        const dateString = convertDateSting(date);
        return selectedDates[year] && selectedDates[year].has(dateString) ? okSymbol : '';
    }

    return (
        <div>
            <div className="user-selector-container">
                <label>
                    <select
                        className="user-selector"
                        onChange={event => setUser(event.target.value)}>
                        {users.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </label>
            </div>
            <Calendar
                onClickDay={handleButtonClick}
                tileContent={({date, view}) => (handleDayContent(date, view))}
            />
            <div>
                {Object.entries(selectedDates).map(([year, dates]) => (
                    dates.size > 0 ? <p key={year}>Year {year}: {dates.size} days</p> : null
                ))}
            </div>
        </div>
    );
}

export default GymTracker