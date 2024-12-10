import { useGetGrades } from "../hooks/card-hooks";
import { GradeObjects, Grades } from "../interfaces/apiData";
import Card from "./shared/Card";
import SkeletonCard from "./shared/SkeletonCard";

const gradeObjtoArray = (gradeObjects: GradeObjects) => {
    // Use keyof Grades to ensure the keys are valid
    const titles: (keyof Grades)[] = Object.keys(
        gradeObjects.now
    ) as (keyof Grades)[];

    return titles.map((title) => ({
        title,
        now: gradeObjects.now[title], // Access the values correctly
        "3M": gradeObjects["3M"][title],
        "6M": gradeObjects["6M"][title],
    }));
};

const GradeCard = () => {
    const { result: gradeObjects, isLoading } = useGetGrades();

    if (isLoading) {
        return <SkeletonCard />;
    }
    if (!gradeObjects) {
        return (
            <Card title={"Factor Grades"}>
                <div>Failed to load data</div>
            </Card>
        );
    }
    const headers = Object.keys(gradeObjects);
    const arrayGradeObjects = gradeObjtoArray(gradeObjects);
    console.log(arrayGradeObjects, "array");
    return (
        <Card title={"Factor Grades"}>
            <div className="w-full h-full">
                <table className="w-full">
                    <thead>
                        <th colSpan={1}></th>
                        {headers.map((headerName: string) => (
                            <th className="pr-2 py-1 md:pr-4 md:py-2 text-xs text-gray-400 font-normal">
                                {headerName === "now"
                                    ? "Now"
                                    : `${headerName} ago`}
                            </th>
                        ))}
                    </thead>
                    <tbody>
                        {arrayGradeObjects.map((item, index: number) => {
                            return (
                                <tr
                                    key={index}
                                    className={`my-2 text-xs lg:text-base 
                                                
                                        `}
                                >
                                    <td className="pr-2 py-1 md:pr-4 md:py-2 text-blue-700">
                                        {item.title}
                                    </td>
                                    <td className="pr-2 py-1 md:pr-4 md:py-2 ">
                                        {item.now}
                                    </td>
                                    <td className="pr-2 py-1 md:px-4 md:py-2  ">
                                        {item["3M"]}
                                    </td>
                                    <td className="pr-2 py-1 md:px-4 md:py-2 ">
                                        {item["6M"]}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default GradeCard;
