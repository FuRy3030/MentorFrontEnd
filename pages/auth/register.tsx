import { EuiAvatar } from "@elastic/eui";
import Timeline from "../../app/components/molecules/list-items/Timeline";
import StandardHeader from "../../app/components/molecules/typography/StandardHeader";
import RegisterForm from "../../app/components/organisms/forms/RegisterForm";
import MySimpleLinksNavigation from "../../app/components/molecules/links/MySimpleLinksNavigation";

function Page() {
    return (
        <div className="w-screen min-h-auto flex flex-col md:min-h-screen md:flex-row">
            <div className="w-full flex flex-col-reverse md:block md:w-1/2 relative bg-light-grey">
                <img alt="Becoming a mentor" src="/un-draw/register-background.svg" 
                    className="scale-[1] relative pb-12 pt-0 md:pb-0 md:scale-[1.5] md:absolute md:bottom-[9%] md:left-0 h-auto object-cover" 
                />
                <div className="w-full px-8 md:px-16 py-10 z-10">
                    <StandardHeader 
                        Header="Prosta weryfikacja"
                        SubHeader="Po wypełnieniu poniższego formularza poprosimy Cię o uzupełnienie Twoich danych na temat Twoich doświadczeń, a następnie zaprosimy Cię na rozmowę weryfikacyjną"
                        Variant="purple"
                    />
                    <Timeline 
                        Items={[
                            {
                                icon: (
                                    <EuiAvatar
                                      name="Account creation"
                                      iconType="userAvatar"
                                      color="#4b50ec"
                                    />
                                ),
                                children: (
                                    <span className="text-dark text-base font-bold cursor-default">
                                        Stwórz swoje konto
                                    </span>
                                ),
                            },
                            {
                                icon: (
                                    <EuiAvatar
                                      name="Profile details"
                                      iconType="documentEdit"
                                      color="#4b50ec"
                                    />
                                ),
                                children: (
                                    <span className="text-dark text-base font-bold cursor-default">
                                        Uzupełnij swój profil
                                    </span>
                                ),
                            },
                            {
                                icon: (
                                    <EuiAvatar
                                      name="Interview"
                                      iconType="discuss"
                                      color="#0d3cfb"
                                    />
                                ),
                                children: (
                                    <span className="text-dark text-base font-bold cursor-default">
                                        Przejdź rozmowę weryfikacyjną
                                    </span>
                                ),
                            },
                            {
                                icon: (
                                    <EuiAvatar
                                      name="Welcome on board"
                                      iconType="check"
                                      color="#0d3cfb"
                                    />
                                ),
                                children: (
                                    <span className="text-dark text-base font-bold cursor-default">
                                        Gotowe! Możesz zacząć udzielać korepetycji
                                    </span>
                                ),
                            }
                        ]}                 
                    />
                </div>
            </div>
            <div className="w-full md:w-1/2 bg-white shadow px-8 md:px-16 py-10 z-10"> 
                <StandardHeader 
                    UpperHeader="Rejestracja -> Mentor"
                    Header="Dołącz do nas!"
                    SubHeader="Załóż swoje konto i zostań mentorem w przygotowaniach do olimpiad"
                    Variant="purple"
                />
                <RegisterForm />
                <MySimpleLinksNavigation 
                    ClassName="mt-8"
                    Heading="Nie znalazłeś tego czego szukasz?"
                    Links={[
                        {
                            To: "/auth/login",
                            Text: "Zaloguj się",
                            Variant: "grey"
                        },
                        {
                            To: "/auth/password-recovery",
                            Text: "Zapomniałem hasła",
                            Variant: "grey"
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default Page;