import { User } from "../interfaces/apiData";
import { getData } from "./config";

export const fetchSummary = async () => {
    return await getData("/ratings-summary");
};

export const fetchUser = async (): Promise<User> => {
    const user = (await getData("/user")) as User;

    if (!user) {
        throw new Error("No user data found");
    }

    return user;
};
