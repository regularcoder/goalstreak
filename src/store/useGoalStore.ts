import { create } from 'zustand'

type Goal = {
    id: string;
    name: string;
    startDate: Date;
}

interface GoalState {
    goals: Goal[];
    addGoal: (goal: Goal) => void
    deleteGoal: (goalId: string) => void
}

const useGoalStore = create<GoalState>()((set) => ({
    goals: [],
    addGoal: (newGoal) => set((state) => ({ goals: [...state.goals, newGoal] })),
    deleteGoal: (goalId: string) => set((state) => ({ goals: state.goals.filter(goal => goal.id !== goalId) })),
}))

export default useGoalStore