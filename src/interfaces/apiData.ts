interface RatingObject {
    rating: string;
    score: number;
}

export interface RatingsResponse {
    SA_Analysts: RatingObject;
    Wall_Street: RatingObject;
    Quant: RatingObject;
}

export interface User {
    premium: boolean;
}

export interface GradesData {
    Valuation: number;
    Growth: number;
    Profitability: number;
    Momentum: number;
    Revisions: number;
}

export interface Rankings {
    [key: string]: RankingsItem;
}

export interface RankingsItem {
    rank: number;
    total: number;
}
export interface RankingsResponse {
    sector: string;
    industry: string;
}

export interface Grades {
    Valuation: string;
    Growth: string;
    Profitability: string;
    Momentum: string;
    Revisions: string;
}

export interface GradeObjects {
    now: Grades;
    "3M": Grades;
    "6M": Grades;
}

export interface NowResponse {
    Valuation: {
        current: string;
    };
    Growth: {
        current: string;
    };
    Profitability: {
        current: string;
    };
    Momentum: {
        current: string;
    };
    Revisions: {
        current: string;
    };
}
