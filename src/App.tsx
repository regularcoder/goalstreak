import './App.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useState} from "react";

/*
TODO:
- Allow specifying start date (set minDate to this)
- Calculate streak

- Fetch checked state from a function
 */

function App() {
    const maxDate = new Date();
    const [minDate, setMinDate] = useState(new Date(2025, 0, 5));
    const [checkedDates, setCheckedDates] = useState(new Map<string, boolean>([]));

    const parseDateString = (dateKey: string): Date => {
        const [year, month, day] = dateKey.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const getDateString = (date: Date): string => date.toISOString().split("T")[0];

    const isChecked = (date: Date): boolean => {
        return checkedDates.get(getDateString(date)) || false;
    }

    const handleDayClick = (date: Date) => {
        const key = getDateString(date);
        const newCheckedDates = new Map(checkedDates);

        if (isChecked(date)) {
            newCheckedDates.delete(key);
        } else {
            newCheckedDates.set(key, true);
        }
        setCheckedDates(newCheckedDates);
    }

    return (
        <>
            <h3>Total days {checkedDates.size}</h3>
            <input type="date" value={getDateString(minDate)}
                   onChange={(e) => setMinDate(parseDateString(e.target.value))}/>
            <Calendar onClickDay={handleDayClick}
                      tileContent={({date}) => {
                          return date >= minDate && date <= maxDate ? <div className='checkbox-wrapper-39'>
                              <input type={'checkbox'} checked={isChecked(date)} onChange={() => handleDayClick(date)}/>
                              <span className="checkbox"></span>
                          </div> : undefined
                      }}
                      minDate={minDate}
                      maxDate={maxDate}
            />
        </>
    )
}

export default App
