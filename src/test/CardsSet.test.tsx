import { vi } from "vitest";
import {
    useGetGrades,
    useGetRanking,
    useGetSummary,
    useGetUser,
} from "../hooks/card-hooks";
import { render, screen } from "@testing-library/react";
import CardsSet from "../components/CardsSet";
import { mockGradeObjects } from "./mockData";

vi.mock("../hooks/card-hooks", () => ({
    useGetUser: vi.fn(),
    useGetRanking: vi.fn(),
    useGetSummary: vi.fn(),
    useGetGrades: vi.fn(),
}));

describe("CardsSet Component", () => {
    it("renders user loading message when use is loading", () => {
        // Mock the hook to return a non-premium user
        (useGetUser as jest.Mock).mockReturnValue({
            data: undefined, // User is not premium
            isLoading: true, // Data has loaded
        });

        render(<CardsSet />);

        expect(screen.getByText("Getting User")).toBeInTheDocument();

        // Ensure SummaryCard and GradeCard are not rendered
        expect(screen.queryByText("Quant Ranking")).not.toBeInTheDocument();
        expect(screen.queryByText("Factor Grades")).not.toBeInTheDocument();

        expect(screen.queryByText("Ratings Summary")).not.toBeInTheDocument();
    });
    it("renders only RankingCard when user.premium is false", () => {
        // Mock the hook to return a non-premium user
        (useGetUser as jest.Mock).mockReturnValue({
            data: { premium: false }, // User is not premium
            isLoading: false, // Data has loaded
        });
        (useGetRanking as jest.Mock).mockReturnValue({
            data: {
                sector: "Information Technology",
                industry: "Technology Hardware, Storage and Peripherals",
                rankings: {
                    overall: {
                        rank: 825,
                        total: 4455,
                    },
                    sector: {
                        rank: 105,
                        total: 552,
                    },
                    industry_specific: {
                        rank: 8,
                        total: 28,
                    },
                },
            },
            isLoading: false,
        });
        render(<CardsSet />);

        // Check that RankingCard is rendered
        expect(screen.getByText("Quant Ranking")).toBeInTheDocument();

        // Ensure SummaryCard and GradeCard are not rendered
        expect(screen.queryByText("Factor Grades")).not.toBeInTheDocument();
        expect(screen.queryByText("Ratings Summary")).not.toBeInTheDocument();
    });

    it("renders all cards when user.premium is true", () => {
        // Mock the hook to return a premium user
        (useGetUser as jest.Mock).mockReturnValue({
            data: { premium: true }, // User is premium
            isLoading: false, // Data has loaded
        });

        (useGetRanking as jest.Mock).mockReturnValue({
            data: {
                sector: "Information Technology",
                industry: "Technology Hardware, Storage and Peripherals",
                rankings: {
                    overall: {
                        rank: 825,
                        total: 4455,
                    },
                    sector: {
                        rank: 105,
                        total: 552,
                    },
                    industry_specific: {
                        rank: 8,
                        total: 28,
                    },
                },
            },
            isLoading: false,
        });
        (useGetGrades as jest.Mock).mockReturnValue({
            data: mockGradeObjects,
            isLoading: false,
            isError: false,
            isSuccess: true,
        });
        (useGetSummary as jest.Mock).mockReturnValue({
            data: {
                SA_Analysts: {
                    rating: "HOLD",
                    score: 3.0,
                },
                Wall_Street: {
                    rating: "BUY",
                    score: 4.13,
                },
                Quant: {
                    rating: "HOLD",
                    score: 3.47,
                },
            },
            isLoading: false,
        });
        render(<CardsSet />);

        expect(screen.getByText("Quant Ranking")).toBeInTheDocument();

        expect(screen.queryByText("Factor Grades")).toBeInTheDocument();
        expect(screen.queryByText("Ratings Summary")).toBeInTheDocument();
    });
});
