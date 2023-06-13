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
        <button type={Props.Type} className={clsx('group flex items-center font-bold cursor-pointer text-base rounded-3xl py-1.5 text-white transition-[background-color] duration-300 ease-in-out hover:bg-white hover:shadow-lg', 
            Props.ClassName)} onClick={Props.onClick}
        >
            <span className="transition-all duration-300 ease-in-out group-hover:mr-2.5">
                {Props.Text}
            </span>
            <span className={clsx('ml-3.5 text-2xl transition-all duration-300 ease-in-out group-hover:text-dark', Props.Icon)}>Icon</span>
        </button>
    );
};

export default StandardButton;