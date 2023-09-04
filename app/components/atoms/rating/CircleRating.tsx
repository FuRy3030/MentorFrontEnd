import clsx from "clsx";

interface CircleRatingProps {
    Color: string;
    Dots: number;
    ActiveDots: number;
    ClassName?: string;
};

const RatingDot = ({ Color } : { Color?: string }) => {
    return (
        <div className="w-3 h-3 rounded-full" style={{ background: Color ? Color : 'rgb(191, 197, 210)' }} />
    );
};

function CircleRating(Props: CircleRatingProps) {
    return (
        <div className={clsx("flex flex-row justify-between h-auto gap-x-3", Props.ClassName)}>
            {Array.from({ length: Props.ActiveDots }, (_, Index) => Index + 1).map((DotIndex) => (
                <RatingDot key={DotIndex} Color={Props.Color} />
            ))}
            {Array.from({ length: Props.Dots - Props.ActiveDots }, (_, Index) => Index + 1).map((DotIndex) => (
                <RatingDot key={DotIndex} />
            ))}
        </div>
    );
};

export default CircleRating;