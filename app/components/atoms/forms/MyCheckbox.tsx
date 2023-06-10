import { EuiCheckbox, EuiFormRow } from "@elastic/eui";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface MyCheckboxFieldProps {
    Id: string;
    Label: string;
    Name: string;
    ClassName?: string;
    FullWidth?: boolean;
};

function MyCheckbox(Props: MyCheckboxFieldProps) {
    const { watch, setValue, formState: { errors }, trigger } = useFormContext();

    return (
        <EuiFormRow fullWidth={Props.FullWidth} isInvalid={!!errors[Props.Name]} 
            error={errors[Props.Name]?.message?.toString()}
        >
            <EuiCheckbox
                checked={watch(Props.Name)} 
                onChange={(e) => {
                    setValue(Props.Name, e.target.checked);
                    trigger(Props.Name);
                }}
                id={Props.Id}
                label={Props.Label}
                className={clsx('my-4', Props.ClassName)}
            />
        </EuiFormRow>
    );
};

export default MyCheckbox;