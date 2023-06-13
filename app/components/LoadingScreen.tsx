import { EuiLoadingSpinner } from "@elastic/eui";
import clsx from "clsx";

interface LoadingScreenProps {
    ClassName?: string;
    Message?: string;
};

function LoadingScreen(Props: LoadingScreenProps) {
    return (
        <div className={clsx("w-full flex flex-col py-12 mx-auto items-center", Props.ClassName)}>
            <EuiLoadingSpinner size="xxl" />
            {Props.Message && <span className="mt-3 text-base font-bold text-semi-dark-alt">{Props.Message}</span>}
        </div>
    );
};

export default LoadingScreen;