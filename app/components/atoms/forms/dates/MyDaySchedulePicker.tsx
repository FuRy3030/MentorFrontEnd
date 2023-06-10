import clsx from "clsx";

interface MyDaySchedulePickerProps {
    Day: string;
    Hours: string[];
    ActiveHours: string[];
    ToggleHour: (Day: string, Hour: string, Action: string) => void;
}

function MyDaySchedulePicker(Props: MyDaySchedulePickerProps) {
    const { Day, Hours, ActiveHours, ToggleHour } = Props;

    return (
        <div className="flex flex-col gap-y-3">
            <span className="text-base font-bold text-semi-dark-alt cursor-default text-center">{Day}</span>
            {Hours.map((Hour) => (
                <span key={Hour} className={clsx("text-xs px-1 py-1 sm:text-sm font-semibold sm:px-3 sm:py-1.5 rounded-lg cursor-pointer", 
                    ActiveHours.find((ActiveHour) => ActiveHour === Hour) ? 
                    "bg-very-light-blue text-neon-blue" : 
                    "bg-dark-gray text-semi-dark-alt line-through")}
                    onClick={() => ToggleHour(Day, Hour, ActiveHours.find((ActiveHour) => ActiveHour === Hour) ? "REMOVE" : "ADD")}
                >
                    {Hour}
                </span>
            ))}
        </div>
    );
};

export default MyDaySchedulePicker;