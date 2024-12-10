import { useGetUser } from "../hooks/card-hooks";
import GradeCard from "./GradeCard";
import RankingCard from "./RankingCard";
import SummaryCard from "./SummaryCard";

const CardsSet = () => {
    const { data: user, isLoading } = useGetUser();

    return (
        <div className="w-full flex  bg-stone-100">
            {isLoading ? (
                <div>Getting User</div>
            ) : (
                <div>
                    {user && user.premium && <SummaryCard />}
                    {user && user.premium && <GradeCard />}
                    <RankingCard />
                </div>
            )}
        </div>
    );
};

export default CardsSet;
