import { useFormContext } from "react-hook-form";
import { EuiFormRow, EuiSuperSelectOption } from '@elastic/eui';
import clsx from "clsx";
import dynamic from "next/dynamic";

interface MySelectFieldProps<T> {
    Label: string;
    Name: string;
    Options: EuiSuperSelectOption<T>[];
    OnChange?: () => void;
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    ClassNameRow?: string;
    FullWidth?: boolean;
    IsValueNumber?: boolean;
};

function MySelectField<T extends string>(Props: MySelectFieldProps<T>) {
    const { watch, setValue, formState: { errors }, trigger } = useFormContext();
    const EuiSuperSelect: any = dynamic(() => import('@elastic/eui').then(module => module.EuiSuperSelect), 
        {ssr: false});

    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}
            isInvalid={!!errors[Props.Name]} error={errors[Props.Name]?.message?.toString()} className={Props.ClassNameRow}
        >
            <EuiSuperSelect
                options={Props.Options}
                valueOfSelected={Props.IsValueNumber ? (watch(Props.Name)).toString() : watch(Props.Name)}
                onChange={(Value: T) => {
                    if (Props.IsValueNumber) setValue(Props.Name, parseInt(Value));
                    else setValue(Props.Name, Value);
                    trigger(Props.Name);
                    Props.OnChange && Props.OnChange();
                }}
                placeholder={Props.Placeholder}
                className={clsx('StandardFont', Props.ClassName)}
                fullWidth={Props.FullWidth}
                isInvalid={!!errors[Props.Name]}
                itemLayoutAlign="top"
                hasDividers
            />
        </EuiFormRow>
    );
};

export default MySelectField;