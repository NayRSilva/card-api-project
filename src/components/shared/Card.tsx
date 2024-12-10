interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
    return (
        <div className="w-[200px] md:w-[350px] text-left p-5 m-5 bg-white flex flex-col">
            <h1 className="text-lg lg:text-xl font-semibold text-neutral-400">
                {title}
            </h1>
            <div className="w-full flex-1 my-2 py-4">{children}</div>
        </div>
    );
};

export default Card;
