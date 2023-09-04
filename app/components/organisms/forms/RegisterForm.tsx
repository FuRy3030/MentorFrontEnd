import MyPasswordField from "../../atoms/forms/MyPasswordField";
import MyTextField from "../../atoms/forms/MyTextField";
import IRegisterForm from "../../../api/types/auth/IRegisterForm";
import { IRegisterFormResolver } from "../../../api/types/auth/IRegisterForm";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import MyCheckbox from "../../atoms/forms/MyCheckbox";
import MyFormProvider from "../../../providers/MyFormProvider";
import UseRegister from "../../../api/requests/auth/mutations/UseRegister";
import MyToast from "../../modals/toasts/MyToast";
import ConfirmationBox from "../../molecules/alerts/ConfirmationBox";

function RegisterForm() {
    const { mutate, error, isSuccess } = UseRegister();
    const Values: IRegisterForm = {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        PolicyConsent: false
    };

    if (isSuccess) {
        return <ConfirmationBox 
            Icon="icon-[material-symbols--person-add-rounded]"
            Heading="Twoje konto zostało założone" 
            Description="Dziękujemy za rejestrację. Twoje konto zostało pomyślnie założone. Teraz możesz się zalogować i dopełnić ostatnich formalności aby zostać tutorem"
            ClassName="my-4"
        />
    } else {
        return (
            <>
                <MyFormProvider<IRegisterForm> FormResolver={IRegisterFormResolver} DefaultValues={Values}
                    OnSubmit={(FormData: IRegisterForm) => mutate(FormData)} ClassName="mx-auto max-w-[500px]"
                >
                    <MyTextField Name="FirstName" Label="Imię" Placeholder="Wpisz swoje imię" FullWidth />
                    <MyTextField Name="LastName" Label="Nazwisko" Placeholder="Wpisz swoje nazwisko" FullWidth />
                    <MyTextField Name="Email" Label="Email" Placeholder="Wpisz swój adres email" FullWidth />
                    <MyPasswordField Name="Password" Label="Hasło" Placeholder="Wpisz swoje hasło" FullWidth />
                    <MyCheckbox Id="PolicyConsent" Name="PolicyConsent" 
                        Label="Tworząc konto na Platformie zgadzam się na Regulamin i Politykę Prywatności" FullWidth 
                    />
                    <MyStandardButton Type="submit" Text="Zarejestruj się" onClick={() => {}} 
                        Icon="icon-[material-symbols--person-add-rounded]" 
                        ClassName="ml-auto mt-2 px-5 bg-dark hover:text-dark" 
                    />
                </MyFormProvider>
                <MyToast 
                    Title="Tworzenie konta nie powidoło się"
                    Type="danger"
                    Icon="warning"
                    IsActionTriggered={!!error}
                >
                    {error?.response.errors?.at(0)?.message === 'User exists' ? 
                        <p className="text-base font-medium">Użytkownik o takim adresie email już istnieje!</p> : 
                        <p className="text-base font-medium">Wystąpił niezydentyfikowany błąd</p>
                    }
                </MyToast>
            </>
        );
    }
};

export default RegisterForm;