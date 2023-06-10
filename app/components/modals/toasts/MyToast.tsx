import { EuiToast } from "@elastic/eui";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";

interface MyToastProps {
    Title: string;
    Type: "success" | "primary" | "warning" | "danger";
    Icon: string;
    IsActionTriggered: boolean;
    children?: ReactNode;
}

function MyToast(Props: MyToastProps) {
    const [ShowToast, SetShowToast] = useState<boolean>(true);

    const BackgroundColors = {
        success: "rgb(237, 247, 237)",
        primary: "rgb(229, 246, 253)",
        warning: "rgb(255, 244, 229)",
        danger: "rgb(253, 237, 237)"
    };

    const FontColorsClasses = {
        success: "ToastSuccess",
        primary: "ToastInfo",
        warning: "ToastWarning",
        danger: "ToastDanger"
    };

    useEffect(() => {
        let Timeout: NodeJS.Timeout;

        if (Props.IsActionTriggered) {
            SetShowToast(true);
            Timeout = setTimeout(() => {
                SetShowToast(false);
            }, 7500);
        }

        return () => clearTimeout(Timeout);
    }, [Props.IsActionTriggered]);

    return (
        <EuiToast
            title={Props.Title}
            color={Props.Type}
            iconType={Props.Icon}
            className={clsx("fixed bottom-5 right-5 z-50 max-w-toast-max-width sm:max-w-[525px]", 
                FontColorsClasses[Props.Type], (ShowToast && Props.IsActionTriggered) ? 'ToastShow' : 'ToastHide')}
            onClose={() => SetShowToast(false)}
            style={{ position: "fixed", backgroundColor: BackgroundColors[Props.Type] }}
        >
            {Props.children}
        </EuiToast>
    );
};

export default MyToast;