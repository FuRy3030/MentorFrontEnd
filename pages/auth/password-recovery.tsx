import MySimpleLinksNavigation from "../../app/components/molecules/links/MySimpleLinksNavigation";
import StandardHeader from "../../app/components/molecules/typography/StandardHeader";
import PasswordResetForm from "../../app/components/organisms/forms/PasswordResetForm";

function Page() {
    return (
        <div className="w-screen min-h-auto flex flex-col-reverse md:min-h-screen md:flex-row">
            <div className="w-full md:w-1/2 relative bg-light-grey">
                <img alt="Becoming a mentor" src="/un-draw/forgot-password-background.svg" 
                    className="scale-[1] relative py-14 md:py-0 md:absolute md:bottom-0 md:left-0 h-auto object-cover" 
                />
                <div className="hidden md:block w-full px-16 py-10 z-10">
                </div>   
            </div>
            <div className="w-full md:w-1/2 bg-white shadow px-8 md:px-16 py-10 z-10"> 
                <StandardHeader 
                    UpperHeader="Odzyskiwanie hasła -> Mentor"
                    Header="Uzyskaj nowe hasło"
                    SubHeader="Wpisz adres e-mail przypisany do twojego konta i poczekaj na link pozwalający na zmianę twojego hasła na nowe"
                    Variant="purple"
                />
                <PasswordResetForm />
                <MySimpleLinksNavigation 
                    ClassName="mt-8"
                    Heading="Nie znalazłeś tego czego szukasz?"
                    Links={[
                        {
                            To: "/auth/login",
                            Text: "Zaloguj się",
                            Variant: "grey"
                        },
                        {
                            To: "/auth/register",
                            Text: "Zarejestruj się",
                            Variant: "grey"
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default Page;