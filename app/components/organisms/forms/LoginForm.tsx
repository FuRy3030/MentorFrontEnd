import ILoginForm, { ILoginFormResolver } from "../../../api/types/auth/ILoginForm";
import MyFormProvider from "../../../providers/MyFormProvider";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import MyPasswordField from "../../atoms/forms/MyPasswordField";
import MyTextField from "../../atoms/forms/MyTextField";

function LoginForm() {
    return (
        <MyFormProvider<ILoginForm> FormResolver={ILoginFormResolver} OnSubmit={() => {}} ClassName="mx-auto max-w-[500px]">
            <MyTextField Name="Email" Label="Email" Placeholder="Wpisz swój adres email" FullWidth />
            <MyPasswordField Name="Password" Label="Hasło" Placeholder="Wpisz swoje hasło" FullWidth />
            <MyStandardButton Type="submit" Text="Zaloguj się" onClick={() => {}} 
                Icon="icon-[jam--log-in]" 
                ClassName="ml-auto mt-6 bg-dark hover:text-dark" 
            />
        </MyFormProvider>
    );
};

export default LoginForm;