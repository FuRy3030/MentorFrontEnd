import { useFormContext } from "react-hook-form";
import { EuiFieldText, EuiFormRow } from '@elastic/eui';
import clsx from "clsx";

interface MyTextFieldProps {
    Label: string;
    Name: string;
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    FullWidth?: boolean;
};

function MyTextField(Props: MyTextFieldProps) {
    const { watch, setValue } = useFormContext();

    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}>
            <EuiFieldText
                value={watch(Props.Name)}
                onChange={(e) => setValue(Props.Name, e.currentTarget.value)}
                placeholder={Props.Placeholder}
                className={clsx('StandardFont', Props.ClassName)}
                fullWidth={Props.FullWidth}
            />
        </EuiFormRow>
    );
};

export default MyTextField;