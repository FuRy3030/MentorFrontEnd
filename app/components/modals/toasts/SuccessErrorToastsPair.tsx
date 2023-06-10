import { ReactNode } from "react";
import MyToast from "./MyToast";

interface SuccessErrorToastsPairProps {
    SuccessTitle: string;
    SuccessContent: ReactNode;
    IsSuccessToastTriggered: boolean;
    ErrorTitle: string;
    ErrorContent: ReactNode;
    IsErrorToastTriggered: boolean;
}

function SuccessErrorToastsPair(Props: SuccessErrorToastsPairProps) {
    const { SuccessTitle, SuccessContent, ErrorTitle, ErrorContent, 
        IsSuccessToastTriggered, IsErrorToastTriggered } = Props;

    return (
        <>
            <MyToast 
                Title={SuccessTitle}
                Type="success"
                Icon="checkInCircleFilled"
                IsActionTriggered={IsSuccessToastTriggered}
            >
                {SuccessContent}
            </MyToast>
            <MyToast 
                Title={ErrorTitle}
                Type="danger"
                Icon="warning"
                IsActionTriggered={IsErrorToastTriggered}
            >
                {ErrorContent}
            </MyToast>
        </>
    );
};

export default SuccessErrorToastsPair;