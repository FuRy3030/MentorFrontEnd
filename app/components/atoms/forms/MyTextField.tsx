import { useFormContext } from "react-hook-form";
import { EuiFieldText, EuiFormRow } from '@elastic/eui';
import clsx from "clsx";

interface MyTextFieldProps {
    Label: string;
    Name: string;
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    ClassNameRow?: string;
    FullWidth?: boolean;
    Readonly?: boolean;
};

function MyTextField(Props: MyTextFieldProps) {
    const { watch, setValue, formState: { errors }, trigger } = useFormContext();

    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}
            isInvalid={!!errors[Props.Name]} error={errors[Props.Name]?.message?.toString()} className={Props.ClassNameRow}
        >
            <EuiFieldText
                value={watch(Props.Name)}
                onChange={(e) => {
                    setValue(Props.Name, e.target.value);
                    trigger(Props.Name);
                }}
                placeholder={Props.Placeholder}
                className={clsx('StandardFont', Props.ClassName)}
                fullWidth={Props.FullWidth}
                isInvalid={!!errors[Props.Name]}
                readOnly={Props.Readonly}
            />
        </EuiFormRow>
    );
};

export default MyTextField;