import UseSendPasswordResetLink from "../../../api/requests/auth/mutations/UseSendPasswordResetLink";
import ISendPasswordResetLinkForm, { ISendPasswordResetLinkFormResolver } from "../../../api/types/auth/ISendPasswordResetLink";
import MyFormProvider from "../../../providers/MyFormProvider";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import MyTextField from "../../atoms/forms/MyTextField";
import MyToast from "../../modals/toasts/MyToast";
import ConfirmationBox from "../../molecules/alerts/ConfirmationBox";

function PasswordResetForm() {
    const { mutate, error, isSuccess, isLoading } = UseSendPasswordResetLink();
    const Values: ISendPasswordResetLinkForm = {
        Email: ""
    };

    if (isSuccess) {
        return <ConfirmationBox 
            Icon="icon-[bi--send-check-fill]"
            Heading="Wysłano wiadomość pozwalająca na zmianę hasła" 
            Description="W przeciągu kilku minut w twojej skrzynce pocztowej powinna znaleźć się wiadomość e-mail zawierająca dalsze kroki pozwalające na zmianę twojego hasła"
            ClassName="my-4"
        />
    }

    return (
        <>
            <MyFormProvider<ISendPasswordResetLinkForm> FormResolver={ISendPasswordResetLinkFormResolver} 
                DefaultValues={Values} OnSubmit={(FormData: ISendPasswordResetLinkForm) => mutate(FormData)} 
                ClassName="mx-auto max-w-[500px]" IsLoading={isLoading}
            >
                <MyTextField Name="Email" Label="Email" Placeholder="Wpisz swój adres email" FullWidth />
                <MyStandardButton Type="submit" Text="Zresetuj hasło" onClick={() => {}} 
                    Icon="icon-[material-symbols--lock-reset-rounded]" 
                    ClassName="ml-auto mt-6 px-5 bg-dark hover:text-dark" 
                />
            </MyFormProvider>
            <MyToast 
                Title="Wystąpił błąd"
                Type="danger"
                Icon="warning"
                IsActionTriggered={!!error}
            >
                {error && 
                    <p className="text-base font-medium">
                        Nie udało nam się zweryfikować twojego konta i / lub adresu email. Spróbuj ponownie później
                    </p>
                }
            </MyToast>
        </>
    );
};

export default PasswordResetForm;