import clsx from "clsx";

interface StandardButtonProps {
    Text: string;
    ClassName?: string;
    onClick: () => void;
    Icon?: string;
    Type?: "button" | "submit" | "reset";
}

function StandardButton(Props: StandardButtonProps) {
    return (
        <button type={Props.Type} className={clsx('group flex items-center font-semibold cursor-pointer text-base rounded-3xl px-5 py-1.5 text-white transition-all duration-300 ease-in-out hover:bg-white hover:shadow-lg', 
            Props.ClassName)}
        >
            {Props.Text}
            <span className={clsx('ml-2 text-2xl transition-all duration-300 ease-in-out group-hover:ml-4', Props.Icon)}>Icon</span>
        </button>
    );
};

export default StandardButton;