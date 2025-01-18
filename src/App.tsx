import './App.css'
import GoalDetails from "./components/GoalDetails";
import Goals from "./components/Goals";
import {useState} from "react";
import {Goal} from "./types/Goals.ts";

function App() {
    const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>()

    return (
        <>
            <Goals selectedGoalId={selectedGoal?.id} onGoalClick={(goal) => setSelectedGoal(goal)} />
            {selectedGoal && <GoalDetails goalId={selectedGoal.id}/>}
        </>
    )
}

export default App
