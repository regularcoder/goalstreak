import './GoalDetails.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useGoalStore from "../../store/useGoalStore.ts";

type GoalDetailsProps = {
    goalId: string;
}

const GoalDetails = ( { goalId } : GoalDetailsProps) => {
    const maxDate = new Date();

    const goal = useGoalStore(state => state.goals.find(goal => goal.id === goalId));
    const updateGoal = useGoalStore(state => state.updateGoal);

    if (!goal) {
        return null
    }

    const checkedDates = goal.checkedDates;

    const parseDateString = (dateKey: string): Date => {
        const [year, month, day] = dateKey.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const getDateString = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

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
        goal.checkedDates = newCheckedDates;
        updateGoal(goal);
    }

    if(!goal) {
        return null
    }

    return (
        <>
            <h3>Total days {checkedDates.size}</h3>
            <input type="date" value={getDateString(goal.startDate)} max={getDateString(maxDate)}
                   onChange={(e) => {
                       goal.startDate = parseDateString(e.target.value)
                       updateGoal(goal);
                   }}/>
            <Calendar onClickDay={handleDayClick}
                      tileContent={({date}) => {
                          return date >= goal.startDate && date <= maxDate ? <div className='checkbox-wrapper-39'>
                              <input type={'checkbox'} checked={isChecked(date)} onChange={() => handleDayClick(date)}/>
                              <span className="checkbox"></span>
                          </div> : undefined
                      }}
                      minDate={goal.startDate}
                      maxDate={maxDate}
            />
        </>
    )
}

export default GoalDetails
