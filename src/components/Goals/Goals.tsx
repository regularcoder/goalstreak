import useGoalStore from "../../store/useGoalStore.ts";

interface FormElements extends HTMLFormControlsCollection {
    nameInput: HTMLInputElement
}

interface CreateGoalFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Goals = () => {
    const { goals, addGoal, deleteGoal } = useGoalStore();

    function createGoal(event: React.FormEvent<CreateGoalFormElement>) {
        event.preventDefault();

        const newGoal = {
            id: crypto.randomUUID(),
            name: event.currentTarget.elements.nameInput.value,
            startDate: new Date()
        };

        addGoal(newGoal);
    }

    return (
        <>
            <h3>Goals</h3>
            <form onSubmit={createGoal}>
                <input name="nameInput"/>
                <button type="submit">Add</button>
            </form>
            {goals.map(goal => (
                <div key={goal.id}>
                    <span>{goal.name}</span> -
                    <span>{goal.startDate.toDateString()}</span>
                    <button onClick={() => deleteGoal(goal.id)}>Delete</button>
                </div>
            ))}
        </>
    )
}

export default Goals
