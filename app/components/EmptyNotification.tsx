function EmptyNotification(Props: { ClassName?: string }) {
    return (
        <div className="w-full flex flex-col my-10">
            <img className="w-[200px] h-auto mx-auto mb-6" src="/flaticons/empty-box.png" alt="Empty box" />
            <span className="text-xl font-semibold text-semi-dark w-full text-center cursor-default">Ale tu pusto...</span>
        </div>
    );
};

export default EmptyNotification;