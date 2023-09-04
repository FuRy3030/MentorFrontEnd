import clsx from "clsx";
import CircleRating from "../../atoms/rating/CircleRating";
import { Moment } from "moment";

interface MeetingProps {
    StudentName: string;
    Color: string;
    EducationalServiceName: string;
    Date: Moment;
    ClassName?: string;
}

function Meeting(Props: MeetingProps) {
    return (
        <div className={clsx("flex flex-col p-4 bg-white shadow-steep-jjt rounded-2xl cursor-default", Props.ClassName)}>
            <h2 className="flex items-center text-xl font-bold text-semi-dark-alt mb-2">
                <span className="icon-[ph--student-bold] mr-1.5" />
                {Props.StudentName}
            </h2>
            <CircleRating 
                Dots={4}
                Color={Props.Color} 
                ActiveDots={4}
                ClassName="w-max mb-0.5 ml-0.5" 
            />
            <h3 className="flex items-center text-lg font-bold text-dark mb-0 leading-6" style={{ color: Props.Color }}>
                {Props.EducationalServiceName}
            </h3>
            <h6 className="flex items-center mt-2 justify-end w-full text-base font-semibold text-semi-dark">
                <span className="icon-[material-symbols--event-outline-rounded] mr-1" />
                {Props.Date.format("DD.MM.YYYY HH:mm")}
            </h6>
        </div>
    );
};

export default Meeting;