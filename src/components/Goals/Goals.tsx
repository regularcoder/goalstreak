import './Goals.css'
import useGoalStore from "../../store/useGoalStore.ts";
import {Goal} from "../../types/Goals.ts";
import React from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonInput,
    IonItem
} from '@ionic/react';

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
            <form onSubmit={createGoal}>
                <IonItem>
                    <IonInput name="nameInput" label="Goal" placeholder="Enter goal name (ex: read for one hour)"></IonInput>
                </IonItem>
                <IonButton type="submit">Add</IonButton>
            </form>
            {goals.map(goal => (
                <>
                    <IonCard
                        key={goal.id}
                        onClick={() => onGoalClick(goal)}
                        className={selectedGoalId === goal.id ? 'selected-goal' : ''}>
                        <IonCardHeader>
                            <IonCardTitle>{goal.name}</IonCardTitle>
                            <IonCardSubtitle>{goal.startDate.toDateString()}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonButton fill="clear" onClick={() => deleteGoal(goal.id)}>Delete</IonButton>
                    </IonCard>
                </>
            ))}
        </>
    )
}

export default Goals
