import React, {useState, useEffect, useCallback} from 'react';
import Calendar from 'react-calendar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import {deleteDate, fetchData, insertDate} from './apiController';
import {convertDateSting, clickOnButton} from "./utils";

const okSymbol = <FontAwesomeIcon icon={faCheckCircle}/>;


function GymTracker() {
    const [selectedDates, setSelectedDates] = useState({});

    const updateSelectedDatesInCalendar = useCallback((selectedDates) => {
        const buttons = Array.from(document.getElementsByTagName("button"));
        buttons.forEach(button => clickOnButton(button, selectedDates));
    }, [])

    useEffect(() => {
        fetchData(setSelectedDates);
    }, []);

    useEffect(() => {
        updateSelectedDatesInCalendar(selectedDates);
    }, [selectedDates, updateSelectedDatesInCalendar]);

    const handleButtonClick = (date) => {
        const dateString = convertDateSting(date);
        const year = date.getFullYear();
        let yearDates = selectedDates[year] || new Set();
        if (yearDates.has(dateString)) {
            yearDates.delete(dateString);
            deleteDate(dateString);
        } else {
            yearDates.add(dateString);
            insertDate(dateString);
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
            <Calendar
                onClickDay={handleButtonClick}
                tileContent={({date, view}) => (handleDayContent(date, view))}
            />
            <div>
                {Object.entries(selectedDates).map(([year, dates]) => (
                    <p key={year}>Year {year}: {dates.size} days</p>
                ))}
            </div>
        </div>
    );
}

export default GymTracker