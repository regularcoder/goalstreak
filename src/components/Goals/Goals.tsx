import './Goals.css'
import useGoalStore from "../../store/useGoalStore.ts";
import {Goal} from "../../types/Goals.ts";
import React from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/react';

interface FormElements extends HTMLFormControlsCollection {
    nameInput: HTMLInputElement
}

interface CreateGoalFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

type GoalsProps = {
    selectedGoalId: string | undefined;
    onGoalClick: (goal: Goal) => void;
}

const Goals = ({selectedGoalId, onGoalClick}: GoalsProps) => {
    const {goals, addGoal, deleteGoal} = useGoalStore();

    function createGoal(event: React.FormEvent<CreateGoalFormElement>) {
        event.preventDefault();

        const newGoal = {
            id: crypto.randomUUID(),
            name: event.currentTarget.elements.nameInput.value,
            startDate: new Date(),
            checkedDates: new Map<string, boolean>([]),
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
                <>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{goal.name}</IonCardTitle>
                            <IonCardSubtitle>{goal.startDate.toDateString()}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>Here's a small text description for the card content. Nothing more, nothing
                            less.</IonCardContent>
                    </IonCard>
                    <div
                        key={goal.id}
                        onClick={() => onGoalClick(goal)}
                        className={selectedGoalId === goal.id ? 'selected-goal' : ''}>
                        <span>{goal.name}</span> -
                        <span>{goal.startDate.toDateString()}</span>
                        <button onClick={() => deleteGoal(goal.id)}>Delete</button>
                    </div>
                </>
            ))}
        </>
    )
}

export default Goals
