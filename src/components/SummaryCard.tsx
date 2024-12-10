import { useGetSummary } from "../hooks/card-hooks";
import { RatingsResponse } from "../interfaces/apiData";
import Card from "./shared/Card";
import SkeletonCard from "./shared/SkeletonCard";

const SummaryCard = () => {
    const { data, isLoading } = useGetSummary();
    const ratingResponse = data as RatingsResponse;

    if (isLoading) {
        return <SkeletonCard />;
    }
    if (!data) {
        return (
            <Card title={"Ratings Summary"}>
                <div>Failed to load data</div>
            </Card>
        );
    }

    const ratingsArray = Object.keys(ratingResponse).map((key) => {
        const ratingKey = key as keyof RatingsResponse;

        return {
            source: ratingKey.replace("_", " "),
            rating: ratingResponse[ratingKey].rating,
            score: ratingResponse[ratingKey].score.toFixed(2),
        };
    });

    return (
        <Card title={"Ratings Summary"}>
            <div className="w-full h-full">
                <table>
                    <tbody>
                        {ratingsArray.map((item) => (
                            <tr
                                key={item.source + item.rating + item.score}
                                className="my-2 text-xs lg:text-base"
                            >
                                <td className="pr-4 py-2 text-blue-700">
                                    {item.source}
                                </td>
                                <td className="px-4 py-2 uppercase">
                                    {item.rating}
                                </td>
                                <td className="px-4 py-2">{item.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default SummaryCard;
