import clsx from "clsx";

function EmptyNotification(Props: { ClassName?: string, Message?: string }) {
    return (
        <div className={clsx("w-full flex flex-col my-10", Props.ClassName)}>
            <img className="w-[200px] h-auto mx-auto mb-6" src="/flaticons/empty-box.png" alt="Empty box" />
            <span className="text-xl font-semibold text-semi-dark w-full text-center cursor-default">
                Ale tu pusto...
                <br />
                {Props.Message ?? ""}
            </span>
        </div>
    );
};

export default EmptyNotification;