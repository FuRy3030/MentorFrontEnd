import UseLogin from "../../../api/requests/auth/mutations/UseLogin";
import ILoginForm, { ILoginFormResolver } from "../../../api/types/auth/ILoginForm";
import MyFormProvider from "../../../providers/MyFormProvider";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import MyPasswordField from "../../atoms/forms/MyPasswordField";
import MyTextField from "../../atoms/forms/MyTextField";
import MyToast from "../../modals/toasts/MyToast";

function LoginForm() {
    const { mutate, error } = UseLogin();
    const Values: ILoginForm = {
        Email: "",
        Password: ""
    };

    return (
        <>
            <MyFormProvider<ILoginForm> FormResolver={ILoginFormResolver} DefaultValues={Values}
                OnSubmit={(FormData: ILoginForm) => mutate(FormData)} ClassName="mx-auto max-w-[500px]">
                <MyTextField Name="Email" Label="Email" Placeholder="Wpisz swój adres email" FullWidth />
                <MyPasswordField Name="Password" Label="Hasło" Placeholder="Wpisz swoje hasło" FullWidth />
                <MyStandardButton Type="submit" Text="Zaloguj się" onClick={() => {}} 
                    Icon="icon-[material-symbols--login-rounded]" 
                    ClassName="ml-auto mt-6 px-5 bg-dark hover:text-dark" 
                />
            </MyFormProvider>
            <MyToast 
                Title="Logowanie nie powidoło się"
                Type="danger"
                Icon="warning"
                IsActionTriggered={!!error}
            >
                {error && 
                    <p className="text-base font-medium">
                        Podany email lub hasło są niepoprawne. Zweryfikuj je i spróbuj ponownie
                    </p>
                }
            </MyToast>
        </>
    );
};

export default LoginForm;