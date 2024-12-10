import { vi } from "vitest";
import { useGetGrades, useGetSummary } from "../hooks/card-hooks";
import { render, screen, within } from "@testing-library/react";
import GradeCard from "../components/GradeCard";
import { mockGradeObjects } from "./mockData";
import SummaryCard from "../components/SummaryCard";

vi.mock("../hooks/card-hooks", () => ({
    useGetSummary: vi.fn(),
}));

describe("SummaryCard Component", () => {
    it("renders skeleton when Summary are loadings", () => {
        // Mock the hook to return a non-premium user
        (useGetSummary as jest.Mock).mockReturnValue({
            data: undefined, // User is not premium
            isLoading: true,
        });

        const { container } = render(<SummaryCard />); // Destructure container from render

        // Find the skeleton element using class name
        const skeletonElement = container.querySelector(".skeleton");

        // Assert that it exists in the document
        expect(skeletonElement).toBeInTheDocument();

        // Ensure SummaryCard and GradeCard are not rendered
        expect(screen.queryByText("Ratings Summary")).not.toBeInTheDocument();
    });
    it("should render a table with correct grade data", async () => {
        // Render the GradeCard component

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
            }, // User is not premium
            isLoading: false, // Data has loaded
        });
        render(<SummaryCard />);

        expect(screen.getByText("Ratings Summary")).toBeInTheDocument();
        expect(screen.getByText("SA Analysts")).toBeInTheDocument();
        expect(screen.getByText("Wall Street")).toBeInTheDocument();
        expect(screen.getByText("Quant")).toBeInTheDocument();

        const analystRow = screen.getByText("SA Analysts").closest("tr");
        const wallRow = screen.getByText("Wall Street").closest("tr");
        const quantRow = screen.getByText("Quant").closest("tr");

        expect(analystRow).not.toBeNull();
        if (analystRow) {
            const ratingCell = within(analystRow).getByText(/HOLD/);
            const scoreCell = within(analystRow).getByText(/3.00/);
            expect(ratingCell).toBeInTheDocument();
            expect(scoreCell).toBeInTheDocument();
        }

        expect(wallRow).not.toBeNull();
        if (wallRow) {
            const ratingCell = within(wallRow).getByText(/BUY/);
            const scoreCell = within(wallRow).getByText(/4.13/);
            expect(ratingCell).toBeInTheDocument();
            expect(scoreCell).toBeInTheDocument();
        }

        expect(quantRow).not.toBeNull();
        if (quantRow) {
            const ratingCell = within(quantRow).getByText(/HOLD/);
            const scoreCell = within(quantRow).getByText(/3.47/); // Update with the correct value
            expect(ratingCell).toBeInTheDocument();
            expect(scoreCell).toBeInTheDocument();
        }
        // Check the contents of the cells
    });
});
