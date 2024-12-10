import { vi } from "vitest";
import { useGetGrades } from "../hooks/card-hooks";
import { render, screen } from "@testing-library/react";
import GradeCard from "../components/GradeCard";
import { mockGradeObjects } from "./mockData";

vi.mock("../hooks/card-hooks", () => ({
    useGetGrades: vi.fn(),
}));

describe("GradeCard Component", () => {
    it("renders skeleton when Grades are", () => {
        // Mock the hook to return a non-premium user
        (useGetGrades as jest.Mock).mockReturnValue({
            result: undefined, // User is not premium
            isLoading: true,
        });

        const { container } = render(<GradeCard />); // Destructure container from render

        // Find the skeleton element using class name
        const skeletonElement = container.querySelector(".skeleton");

        // Assert that it exists in the document
        expect(skeletonElement).toBeInTheDocument();

        // Ensure SummaryCard and GradeCard are not rendered
        expect(screen.queryByText("Factor Grades")).not.toBeInTheDocument();
    });
    it("should render a table with correct grade data", async () => {
        // Render the GradeCard component

        (useGetGrades as jest.Mock).mockReturnValue({
            result: mockGradeObjects, // User is not premium
            isLoading: false, // Data has loaded
        });
        render(<GradeCard />);

        // Check if the component renders the correct headers
        expect(screen.getByText("Factor Grades")).toBeInTheDocument();
        expect(screen.getByText("Now")).toBeInTheDocument();
        expect(screen.getByText("3M ago")).toBeInTheDocument();
        expect(screen.getByText("6M ago")).toBeInTheDocument();

        const valuationRow = screen.getByText("Valuation").closest("tr");
        expect(valuationRow).toHaveTextContent("A");
        expect(valuationRow).toHaveTextContent("B");
        expect(valuationRow).toHaveTextContent("C");
    });
});
