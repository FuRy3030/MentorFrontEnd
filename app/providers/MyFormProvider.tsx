import { FieldValues, FormProvider, Resolver, useForm } from "react-hook-form";

interface MyFormProviderProps<IForm extends FieldValues> {
    FormResolver: Resolver<any, any>;
    OnSubmit: (Data: IForm) => void;
    ClassName?: string;
    children: any;
}

function MyFormProvider<IForm extends FieldValues>(Props: MyFormProviderProps<IForm>) {
    const Methods = useForm<IForm>({
        resolver: Props.FormResolver
    });

    return (
        <FormProvider {...Methods}>
            <form className={Props.ClassName} onSubmit={Methods.handleSubmit(Props.OnSubmit)}>
                {Props.children}
            </form>
        </FormProvider>
    );
};

export default MyFormProvider;