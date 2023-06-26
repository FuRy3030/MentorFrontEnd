import { EuiSwitch } from "@elastic/eui";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

export interface MySwitchProps {
    Label: string;
    Name: string;
    OnChange?: () => void;
    Compressed?: boolean;
    ClassName?: string;
    HideLabel?: boolean;
}

function MySwitch(Props: MySwitchProps) {
    const { watch, setValue, trigger } = useFormContext();
    
    return (
        <EuiSwitch
            checked={watch(Props.Name)} 
            onChange={(e) => {
                setValue(Props.Name, e.target.checked);
                trigger(Props.Name);
            }}
            label={Props.Label}
            showLabel={!(Props.HideLabel)}
            className={clsx('', Props.ClassName)}
            compressed={Props.Compressed}
        />
    );
};

export default MySwitch;