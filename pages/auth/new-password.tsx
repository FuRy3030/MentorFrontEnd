import { useRouter } from "next/router";
import MySimpleLinksNavigation from "../../app/components/molecules/links/MySimpleLinksNavigation";
import StandardHeader from "../../app/components/molecules/typography/StandardHeader";
import NewPasswordForm from "../../app/components/organisms/forms/NewPasswordForm";

function Page() {
    const Router = useRouter();
    const { query } = Router;

    return (
        <div className="w-screen min-h-auto flex flex-col-reverse md:min-h-screen md:flex-row">
            <div className="w-full md:w-1/2 relative bg-light-grey">
                <img alt="Becoming a mentor" src="/un-draw/new-password.svg" 
                    className="scale-[1] relative py-14 px-8 md:py-6 md:px-6 md:absolute md:bottom-0 md:left-0 h-auto object-cover" 
                />
                <div className="hidden md:block w-full px-16 py-10 z-10">
                </div>   
            </div>
            <div className="w-full md:w-1/2 bg-white shadow px-8 md:px-16 py-10 z-10"> 
                <StandardHeader 
                    UpperHeader="Nowe hasło -> Mentor"
                    Header="Ustaw nowe hasło"
                    SubHeader="Przypisz nowe hasło do swojego konta tutora. Od razu po zmianie starego hasła będziesz mógł zalogować się używając nowego hasła"
                    Variant="purple"
                />
                <NewPasswordForm Token={query.Token as string | undefined} />
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