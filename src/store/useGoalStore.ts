import { create } from 'zustand'
import {Goal} from "../types/Goals.ts";

interface GoalState {
    goals: Goal[];
    addGoal: (goal: Goal) => void
    deleteGoal: (goalId: string) => void
    updateGoal: (goal: Goal) => void
}

const useGoalStore = create<GoalState>()((set) => ({
    goals: [],
    addGoal: (newGoal) => set((state) => ({ goals: [...state.goals, newGoal] })),
    deleteGoal: (goalId: string) => set((state) => ({ goals: state.goals.filter(goal => goal.id !== goalId) })),
    updateGoal: (updatedGoal) => set((state) => ({ goals: state.goals.map(g => g.id === updatedGoal.id ? {...updatedGoal} : g) })),
}))

export default useGoalStore