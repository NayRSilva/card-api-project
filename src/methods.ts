import { Grades, NowResponse } from "./interfaces/apiData";

export const sixMToGradeObj = (
    sixM: [string, string][]
): Record<string, string> => {
    const result: Record<string, string> = {};
    sixM.forEach((truple: [string, string]) => {
        result[truple[0]] = truple[1];
    });
    return result;
};

export const nowToGradeObj = (now: NowResponse): Record<string, string> => {
    const result: Record<string, string> = {};
    const nowKeys = Object.keys(now) as (keyof NowResponse)[]; // Ensure we get keys as keyof NowResponse

    nowKeys.forEach((key) => {
        result[key] = now[key].current; // Access 'current' for each key
    });

    return result;
};

export const reorderObjectToGrades = (
    obj: Record<keyof Grades, string>, // Ensures the object has keys that match Grades
    order: string[] // The order in which the properties should appear
): Grades => {
    const result: Partial<Grades> = {}; // Use Partial initially since we're building the object

    // Loop through the desired order and build the result object
    order.forEach((key) => {
        if (key in obj) {
            result[key as keyof Grades] = obj[key as keyof Grades]; // Ensure the key is valid for Grades
        }
    });

    return result as Grades; // Type assertion to ensure result matches Grades
};
