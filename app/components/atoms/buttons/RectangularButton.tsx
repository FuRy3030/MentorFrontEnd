import clsx from "clsx";

interface RectangularButtonProps {
    Text: string;
    ClassName?: string;
    OnClick: () => void;
    Icon?: string;
    // Variant: "dark" | "purple";
}

function RectangularButton(Props: RectangularButtonProps) {
    return (
        <button className={clsx("group flex items-center justify-center cursor-pointer rounded-lg px-4 py-1.5 gap-x-3 border-dashed border-2 border-brand-purple-light bg-white transition-all duration-300 ease-in-out hover:bg-brand-purple-extra-light", Props.ClassName)}
            onClick={Props.OnClick}
        >
            {Props.Icon && 
                <div className="flex items-center bg-brand-purple-extra-light text-brand-purple-light p-1.5 rounded-full">
                    <span className={clsx("text-large", Props.Icon)}>
                    Icon
                    </span>
                </div>
            }
            <span className="text-sm font-bold text-brand-purple-light">
                {Props.Text}
            </span>
        </button>
    );
};

export default RectangularButton;