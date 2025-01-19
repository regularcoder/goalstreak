import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
// import './Tab1.css';
import {useState} from "react";
import {Goal} from "../../types/Goals.ts";
import Goals from "../../components/Goals";
import GoalDetails from "../../components/GoalDetails";

const Home: React.FC = () => {
    const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <>
                    <Goals selectedGoalId={selectedGoal?.id} onGoalClick={(goal) => setSelectedGoal(goal)}/>
                    {selectedGoal && <GoalDetails goalId={selectedGoal.id}/>}
                </>
                )
            </IonContent>
        </IonPage>
    );
};

export default Home;
