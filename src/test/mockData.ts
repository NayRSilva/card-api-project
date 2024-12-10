import { GradeObjects, Grades } from "../interfaces/apiData";

export const mockGradesA: Grades = {
    Valuation: "A",
    Growth: "B",
    Profitability: "C",
    Momentum: "A",
    Revisions: "B",
};

export const mockGradesB: Grades = {
    Valuation: "B",
    Growth: "B",
    Profitability: "C",
    Momentum: "A",
    Revisions: "B",
};

export const mockGradesC: Grades = {
    Valuation: "C",
    Growth: "B",
    Profitability: "C",
    Momentum: "A",
    Revisions: "B",
};

export const mockGradeObjects: GradeObjects = {
    now: mockGradesA,
    "3M": mockGradesB,
    "6M": mockGradesC,
};

export const mockRankings = {
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
};
