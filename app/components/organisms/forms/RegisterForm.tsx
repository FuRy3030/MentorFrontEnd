import { FormProvider, useForm } from "react-hook-form";
import MyPasswordField from "../../atoms/forms/MyPasswordField";
import MyTextField from "../../atoms/forms/MyTextField";
import IRegisterForm from "../../../api/types/auth/IRegisterForm";
import { IRegisterFormResolver } from "../../../api/types/auth/IRegisterForm";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import MyCheckbox from "../../atoms/forms/MyCheckbox";
import MyFormProvider from "../../../providers/MyFormProvider";

function RegisterForm() {
    return (
        <MyFormProvider<IRegisterForm> FormResolver={IRegisterFormResolver} OnSubmit={() => {}} ClassName="mx-auto max-w-[500px]">
            <MyTextField Name="FirstName" Label="Imię" Placeholder="Wpisz swoje imię" FullWidth />
            <MyTextField Name="Surname" Label="Nazwisko" Placeholder="Wpisz swoje nazwisko" FullWidth />
            <MyTextField Name="Email" Label="Email" Placeholder="Wpisz swój adres email" FullWidth />
            <MyPasswordField Name="Password" Label="Hasło" Placeholder="Wpisz swoje hasło" FullWidth />
            <MyCheckbox Id="PolicyConsent" Name="PolicyConsent" Label="Tworząc konto na Platformie zgadzam się na Regulamin i Politykę Prywatności" />
            <MyStandardButton Type="submit" Text="Zarejestruj się" onClick={() => {}} 
                Icon="icon-[jam--log-in]" 
                ClassName="ml-auto mt-2 bg-dark hover:text-dark" 
            />
        </MyFormProvider>
    );
};

export default RegisterForm;