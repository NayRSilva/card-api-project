interface SkeletonCardProps {
    width?: string; // Optionally customize the width of the skeleton card
}

const SkeletonCard = ({ width = "w-[200px]" }: SkeletonCardProps) => {
    return (
        <div
            className={`${width} md:w-[350px] text-left p-5 m-5 bg-white flex flex-col animate-pulse skeleton`}
        >
            {/* Simulating title */}
            <div className="h-6 bg-gray-300 rounded w-[60%] mb-4"></div>

            {/* Simulating content area */}
            <div className="w-full flex-1 my-2 py-4">
                <div className="h-32 bg-gray-300 rounded"></div>{" "}
                {/* Simulating content area */}
            </div>
        </div>
    );
};

export default SkeletonCard;
