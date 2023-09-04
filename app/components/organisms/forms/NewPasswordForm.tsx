import { redirect, useRouter } from "next/navigation";
import UseNewPassword from "../../../api/requests/auth/mutations/UseNewPassword";
import INewPasswordForm, { INewPasswordFormFormResolver } from "../../../api/types/auth/INewPasswordForm";
import MyFormProvider from "../../../providers/MyFormProvider";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import MyPasswordField from "../../atoms/forms/MyPasswordField";
import MyToast from "../../modals/toasts/MyToast";
import ConfirmationBox from "../../molecules/alerts/ConfirmationBox";

function NewPasswordForm({ Token }: { Token?: string }) {
    const { mutate, error, isSuccess, isLoading } = UseNewPassword();
    const Values: INewPasswordForm = {
        Token: Token,
        Password: ""
    };

    if (isSuccess) {
        return <ConfirmationBox 
            Icon="icon-[material-symbols--verified-user-rounded]"
            Heading="Zmiana hasła powiodła się!" 
            Description="Udało nam się zmienić twoje hasło na nowe. Od teraz możesz zalogować się na platformę używając go"
            ClassName="my-4"
        />
    }

    return (
        <>
            <MyFormProvider<INewPasswordForm> FormResolver={INewPasswordFormFormResolver} 
                DefaultValues={Values} OnSubmit={(FormData: INewPasswordForm) => mutate(FormData)} 
                ClassName="mx-auto max-w-[500px]" IsLoading={isLoading} IsFetched={!!Token}
            >
                <MyPasswordField Name="Password" Label="Hasło" Placeholder="Wpisz swoje hasło" FullWidth />
                <MyStandardButton Type="submit" Text="Ustaw nowe hasło" onClick={() => {}} 
                    Icon="icon-[material-symbols--key-rounded]" 
                    ClassName="ml-auto mt-6 px-5 bg-dark hover:text-dark" 
                />
            </MyFormProvider>
            <MyToast 
                Title="Zmiana hasła nie powiodła się"
                Type="danger"
                Icon="warning"
                IsActionTriggered={!!error}
            >
                {error && 
                    <p className="text-base font-medium">
                        Twój token pozwalający na zmianę hasła jest wygasły lub nieprawidłowy. Musisz użyć nowego linku pochodzącego z innej wiadomości email
                    </p>
                }
            </MyToast>
        </>
    );
};

export default NewPasswordForm;