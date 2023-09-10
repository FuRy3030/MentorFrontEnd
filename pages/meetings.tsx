import moment from "moment";
import UseMeetingsQuery from "../app/api/requests/meetings/queries/UseMeetingsQuery";
import IMeeting from "../app/api/types/meetings/IMeeting";
import Meeting from "../app/components/molecules/list-items/Meeting";
import PageHeader from "../app/components/organisms/page_parts/PageHeader";
import UseOlympiadsLabelValuePair from "../app/hooks/constants/UseOlympiadsLabelValuePair";
import LoadingScreen from "../app/components/LoadingScreen";
import EmptyNotification from "../app/components/EmptyNotification";

function Page() {  
    const { data, isLoading } = UseMeetingsQuery();

    return (
        <>
            <PageHeader
                UpperHeader="Zajęcia"
                Header="Lista wszystkich twoich spotkań z uczniami"
                Paragraphs={[
                    "Na poniższej liście znajdziesz wszystkie swoje zajęcia z uczniami - przeszłe i obecne.",
                    "Do każdego spoktania generowany jest link do Google Meet'a, który przekieruje Cię na wideo lekcje."
                ]}
                ImageSrc="/illustrated/Meeting.jpg"
                ImageAlt="Meetings"
            />
            <h1 className="mt-10 text-4xl text-dark font-bold cursor-default text-center mx-auto px-6">
                Moje zajęcia
            </h1>
            <div className="w-full mt-8 flex flex-row flex-wrap justify-between px-8">
                {isLoading ? 
                    <LoadingScreen Message="Ładujemy twoje dane..." /> 
                    : data?.length === 0 ? 
                    <EmptyNotification Message="Narazie nie ma tu jeszcze żadnego spotkania" />
                    :
                    data?.map((TutorMeeting: IMeeting) => { 
                        return (
                            <Meeting 
                                key={TutorMeeting.Id}
                                StudentName={TutorMeeting.StudentName}
                                Color={UseOlympiadsLabelValuePair().find((OlympiadData) => 
                                    OlympiadData.value === TutorMeeting.EducationalServiceName)?.color as string}
                                EducationalServiceName={UseOlympiadsLabelValuePair().find((OlympiadData) => 
                                    OlympiadData.value === TutorMeeting.EducationalServiceName)?.label as string}
                                Date={moment(TutorMeeting.Date)}
                                IsPaid={TutorMeeting.IsPaid}
                                ClassName="w-full md:w-[48%] mb-5"
                            />
                        );
                    })
                }
            </div>
        </>
    );
};

export default Page;