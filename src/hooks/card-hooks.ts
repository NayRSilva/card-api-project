import { useQuery } from "@tanstack/react-query";
import { GradeObjects, Grades, NowResponse, User } from "../interfaces/apiData";
import { fetchSummary, fetchUser } from "../api/card-queries";
import {
    nowToGradeObj,
    reorderObjectToGrades,
    sixMToGradeObj,
} from "../methods";
import { getData } from "../api/config";

export const useGetUser = () => {
    const query = useQuery<User>({
        queryKey: ["user"],
        queryFn: () => fetchUser(),
    });
    // const query = {
    //     isLoading: false,
    //     data: { premium: true },
    // };

    return query;
};

export const useGetSummary = () => {
    return useQuery({
        queryKey: ["summary"], // Unique key for caching
        queryFn: () => fetchSummary(), // Fetch function
    });
};

export const useGetRanking = () => {
    return useQuery({
        queryKey: ["ranking"],
        queryFn: () => getData("/quant-ranking"),
    });
};
export const useGetGrades = () => {
    const nowQuery = useQuery({
        queryKey: ["now"],
        queryFn: () => getData("/factor-grades/now"),
    });
    const threeMQuery = useQuery({
        queryKey: ["threeM"],
        queryFn: () => getData("/factor-grades/3m"),
    });
    const sixMQuery = useQuery({
        queryKey: ["sixM"],
        queryFn: () => getData("/factor-grades/6m"),
    });

    // Destructure query states for loading, success, and error
    const {
        data: nowData,
        isLoading: isLoadingNow,
        isError: isErrorNow,
    } = nowQuery;
    const {
        data: threeMData,
        isLoading: isLoadingThreeM,
        isError: isErrorThreeM,
    } = threeMQuery;
    const {
        data: sixMData,
        isLoading: isLoadingSixM,
        isError: isErrorSixM,
    } = sixMQuery;

    const typedNow = nowData as NowResponse;
    const typedSix = sixMData as { data: [string, string][] };
    const typedThree = threeMData as Grades;
    // Check for loading states and errors
    const isLoading = isLoadingNow || isLoadingThreeM || isLoadingSixM;
    const isError = isErrorNow || isErrorThreeM || isErrorSixM;
    const isSuccess = !isLoading && !isError;

    let result: GradeObjects | null = null;
    if (typedNow && typedThree && typedSix) {
        const nowGradeObject = nowToGradeObj(typedNow);
        const sixGradeObject = sixMToGradeObj(typedSix.data);
        const order = [
            "Valuation",
            "Growth",
            "Profitability",
            "Momentum",
            "Revisions",
        ];

        result = {
            now: reorderObjectToGrades(nowGradeObject, order),
            "3M": typedThree,
            "6M": reorderObjectToGrades(sixGradeObject, order),
        };
    }
    return {
        result: result,
        isSuccess: isSuccess,
        isLoading: isLoading,
        isError: isError,
    };
};
