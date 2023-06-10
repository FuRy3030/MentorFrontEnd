import { DeepPartial, FieldValues, FormProvider, Resolver, useForm } from "react-hook-form";

interface MyFormProviderProps<IForm extends FieldValues> {
    FormResolver: Resolver<any, any>;
    OnSubmit: (Data: IForm) => void;
    DefaultValues?: DeepPartial<IForm>;
    ClassName?: string;
    children: any;
}

function MyFormProvider<IForm extends FieldValues>(Props: MyFormProviderProps<IForm>) {
    const Methods = useForm<IForm>({
        resolver: Props.FormResolver,
        defaultValues: Props.DefaultValues
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