import { useEffect } from "react";
import { DeepPartial, FieldValues, FormProvider, Resolver, useForm } from "react-hook-form";
import LoadingScreen from "../components/LoadingScreen";

interface MyFormProviderProps<IForm extends FieldValues> {
    FormResolver: Resolver<any, any>;
    OnSubmit: (Data: IForm) => void;
    DefaultValues?: DeepPartial<IForm>;
    ClassName?: string;
    IsFetched?: boolean;
    IsLoading?: boolean;
    children: any;
}

function MyFormProvider<IForm extends FieldValues>(Props: MyFormProviderProps<IForm>) {
    const Methods = useForm<IForm>({
        resolver: Props.FormResolver,
        defaultValues: Props.DefaultValues
    });
    
    useEffect(() => {
        Methods.reset(Props.DefaultValues);
    }, [Props.IsFetched]);

    return (
        <FormProvider {...Methods}>
            {Props.IsLoading ?
                <LoadingScreen Message="Aktualizujemy twoje dane..." /> 
                :
                <form className={Props.ClassName} onSubmit={Methods.handleSubmit(Props.OnSubmit)}>
                    {Props.children}
                </form>
            }
        </FormProvider>
    );
};

export default MyFormProvider;