import clsx from "clsx";

interface PriceRangeProps {
    Text: string;
    ClassName?: string;
}

function PriceRange(Props: PriceRangeProps) {
    return (
        <div className={clsx("py-2.5 px-2.5 rounded-3xl bg-white shadow-steep-jjt z-10 cursor-default", Props.ClassName)}>
            <span className="text-base font-semibold py-1 px-5 rounded-3xl text-normal-blue bg-extremely-light-blue">
                {Props.Text}
            </span>
        </div>
    )
};

export default PriceRange;