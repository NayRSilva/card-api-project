import { vi } from "vitest";
import { useGetRanking } from "../hooks/card-hooks";
import { render, screen, within } from "@testing-library/react";
import { mockRankings } from "./mockData";
import RankingCard from "../components/RankingCard";

vi.mock("../hooks/card-hooks", () => ({
    useGetRanking: vi.fn(),
}));

describe("RankingCard Component", () => {
    it("renders skeleton when Ranking are loading", () => {
        // Mock the hook to return a non-premium user
        (useGetRanking as jest.Mock).mockReturnValue({
            result: undefined, // User is not premium
            isLoading: true,
        });

        const { container } = render(<RankingCard />); // Destructure container from render

        // Find the skeleton element using class name
        const skeletonElement = container.querySelector(".skeleton");

        // Assert that it exists in the document
        expect(skeletonElement).toBeInTheDocument();

        // Ensure SummaryCard and GradeCard are not rendered
        expect(screen.queryByText("Quant Ranking")).not.toBeInTheDocument();
    });
    it("should render correct ranking data", async () => {
        // Render the GradeCard component

        (useGetRanking as jest.Mock).mockReturnValue({
            data: mockRankings, // User is not premium
            isLoading: false, // Data has loaded
        });
        render(<RankingCard />);

        // Check that the component renders the table headers
        expect(screen.getByText("Ranked Overall")).toBeInTheDocument();
        expect(screen.getByText("Ranked in Sector")).toBeInTheDocument();
        expect(screen.getByText("Ranked in Industry")).toBeInTheDocument();
        // Check if the correct rank and total are displayed inside <span> elements
        const overallRankRow = screen.getByText("Ranked Overall").closest("tr");
        const sectorRankRow = screen
            .getByText("Ranked in Sector")
            .closest("tr");
        const industryRankRow = screen
            .getByText("Ranked in Industry")
            .closest("tr");

        expect(overallRankRow).toBeInTheDocument();
        if (overallRankRow) {
            expect(within(overallRankRow).getByText("825")).toBeInTheDocument(); // Check for rank 825
            expect(
                within(overallRankRow).getByText("4455")
            ).toBeInTheDocument(); // Check for total 4455
            expect(
                within(overallRankRow).getByText("out of")
            ).toBeInTheDocument(); // Check for "out of" in context
        }

        if (sectorRankRow) {
            expect(within(sectorRankRow).getByText("105")).toBeInTheDocument(); // Check for rank 825
            expect(within(sectorRankRow).getByText("552")).toBeInTheDocument(); // Check for total 4455
            expect(
                within(sectorRankRow).getByText("out of")
            ).toBeInTheDocument(); // Check for "out of" in context
        }

        if (industryRankRow) {
            expect(within(industryRankRow).getByText("8")).toBeInTheDocument(); // Check for rank 825
            expect(within(industryRankRow).getByText("28")).toBeInTheDocument(); // Check for total 4455
            expect(
                within(industryRankRow).getByText("out of")
            ).toBeInTheDocument(); // Check for "out of" in context
        }
    });
});
