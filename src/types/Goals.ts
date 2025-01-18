export type Goal = {
    id: string;
    name: string;
    startDate: Date;
    checkedDates: Map<string, boolean>;
}
