import Tabs from "../app/components/molecules/list-items/Tabs";
import IntroductionHeader from "../app/components/molecules/typography/IntroductionHeader";
import ScheduleExceptionsForm from "../app/components/organisms/forms/ScheduleExceptionsForm";
import ScheduleForm from "../app/components/organisms/forms/ScheduleForm";

function Page() {

    return (
        <>
            <div className="flex flex-row w-full flex-wrap justify-between mb-4">
                <IntroductionHeader 
                    UpperHeader="Spersonalizuj swój harmonogram"
                    Header="Mój grafik dostępności"
                    Paragraphs={[
                        "Uzupełnij lub edytuj swój harmonogram zajęć zawierający twoją tygodniową dostępność w wybranych dniach i godzinach. Będzie on widoczny (w przód o kilka miesięcy) dla uczniów chcących zarezerwować u Ciebie terminy.",
                        "Swój grafik zajęć możesz modyfikować w każdej chwili. W przypadku zmian konkretnych dat i godzin, przejdź do zakładki Kalendarz i zastosuj je dla wybranego dnia. Jeżeli uczeń wykupił już u Ciebie zajęcia, których nie jesteś w stanie zorganizować, będziesz musiał skontaktować się z nim indywidualnie."
                    ]}
                    ClassName="w-[100%] md:w-[47.5%]"
                />
                <img className="w-[100%] md:w-[47.5%] h-auto self-start" src="/illustrated/introduction/Calendar.png" alt="Calendar" />
            </div>
            <div className="px-6 w-full h-auto sm:px-8 py-6 rounded-xl bg-white">
            {/* border border-gray-200 border-solid shadow-steep-jjt */}
                <Tabs 
                    Expanded={true} 
                    Size="m"
                    DefaultTab="schedule"
                    Tabs={[
                        {
                            Id: "schedule",
                            Name: "Harmonogram godzinowy",
                            Content: <ScheduleForm />
                        },
                        {
                            Id: "calendar",
                            Name: "Kalendarz",
                            Content: <ScheduleExceptionsForm />
                        }
                    ]}
                />
            </div>
        </>
    );
};

export default Page;