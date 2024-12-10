import { useGetRanking } from "../hooks/card-hooks";
import { Rankings } from "../interfaces/apiData";
import Card from "./shared/Card";
import SkeletonCard from "./shared/SkeletonCard";

type RankingsResponse = {
    sector: string;
    industry: string;
    rankings: Rankings;
};

const rankDict = {
    overall: "Ranked Overall",
    sector: "Ranked in Sector",
    industry_specific: "Ranked in Industry",
};

const RankingCard = () => {
    const { data, isLoading } = useGetRanking();
    const rankingsResponse = data as RankingsResponse;
    if (isLoading) {
        return <SkeletonCard />;
    }
    if (!data) {
        return (
            <Card title={"Quant Ranking"}>
                <div>Failed to load data</div>
            </Card>
        );
    }
    const rankingsArray = Object.keys(rankingsResponse)
        .map((key) => {
            const ratingKey = key as keyof RankingsResponse;
            let info;

            // Check if the key is "rankings", which has nested objects
            if (ratingKey === "rankings") {
                const rankings = rankingsResponse[ratingKey] as Rankings;

                // Iterate through the rankings object and extract the necessary info
                info = Object.keys(rankings).map((rankKey) => {
                    const rankInfo = rankings[rankKey as keyof Rankings];

                    return {
                        title:
                            rankDict[rankKey as keyof typeof rankDict] ||
                            `Ranked ${
                                rankKey.charAt(0).toUpperCase() +
                                rankKey.slice(1)
                            }`,
                        info: (
                            <>
                                <span className="font-bold">
                                    {rankInfo.rank}
                                </span>{" "}
                                out of{" "}
                                <span className="font-bold">
                                    {rankInfo.total}
                                </span>
                            </>
                        ),
                    };
                });
            } else {
                // For other keys, it's just a simple string
                info = {
                    title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
                    info: rankingsResponse[
                        key as keyof RankingsResponse
                    ] as string,
                };
            }

            // If rankings info is an array (from rankings object), flatten it into a single array
            return Array.isArray(info) ? info : [info];
        })
        .flat(); // Flatten the array to get a single list of entries

    return (
        <Card title={"Quant Ranking"}>
            <div className="w-full h-full">
                <table className="w-full">
                    <tbody>
                        {rankingsArray.map((item, index: number) => {
                            return (
                                <tr
                                    key={item.title + item.info}
                                    className={`my-2 text-xs lg:text-base ${
                                        index !== rankingsArray.length - 1
                                            ? "border-b-2 border-gray-300"
                                            : ""
                                    }`}
                                >
                                    <td className="pr-2 py-1 md:pr-4 md:py-2 ">
                                        {item.title}
                                    </td>
                                    <td className="pr-2 py-1 md:px-4 md:py-2  text-blue-700">
                                        {item.info}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-2">
                    <a
                        href=""
                        className="w-full text-blue-700 cursor-pointer text-xxs font-bold"
                    >
                        Quant Ratings Beat The Market {">>"}
                    </a>
                </div>
            </div>
        </Card>
    );
};

export default RankingCard;
