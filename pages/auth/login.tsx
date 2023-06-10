import LoginForm from "../../app/components/organisms/forms/LoginForm";
import StandardHeader from "../../app/components/molecules/typography/StandardHeader";
import MySimpleLinksNavigation from "../../app/components/molecules/links/MySimpleLinksNavigation";

function Page() {
    return (
        <div className="w-screen min-h-screen flex flex-row">
            <div className="w-1/2 relative bg-light-grey">
                <img alt="Becoming a mentor" src="/un-draw/register-background.svg" 
                    className="scale-[1.5] absolute bottom-[9%] left-0 h-auto object-cover" 
                />
                <div className="w-full px-16 py-10 z-10">
                </div>   
            </div>
            <div className="w-1/2 bg-white shadow px-16 py-10 z-10"> 
                <StandardHeader 
                    UpperHeader="Logowanie -> Mentor"
                    Header="Witamy z powrotem!"
                    SubHeader="Ciekawe co u twoich podopiecznych... Zaloguj się na platformę, aby móc pracować z przyszłymi laureatami"
                    Variant="purple"
                />
                <LoginForm />
                <MySimpleLinksNavigation 
                    ClassName="mt-8"
                    Heading="Nie znalazłeś tego czego szukasz?"
                    Links={[
                        {
                            To: "/auth/register",
                            Text: "Zarejestruj się",
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