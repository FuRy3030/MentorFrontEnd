import clsx from "clsx";
import MySwitch, { MySwitchProps } from "../../atoms/forms/MySwitch";

interface PriceInfoProps {
    ServiceName: string;
    Price: number;
    Currency: string;
    OldPrice?: number;
    IsHotOffer?: boolean;
    ClassName?: string;
    Switch?: MySwitchProps;
}

function PriceInfo(Props: PriceInfoProps) {
    return (
        <div className={clsx("flex flex-row items-center py-2 bg-white my-3.5", Props.IsHotOffer ? 'HotContent' : 'shadow-steep-jjt', Props.ClassName)}
            style={{ borderRadius: "8px" }}
        >
            {Props.Switch && <MySwitch {...Props.Switch} />}
            <span className="text-base font-bold text-dark mr-auto ml-4 cursor-default">
                {Props.ServiceName}
            </span>
            {typeof Props.OldPrice !== "undefined" && (
                <span className="text-sm font-semibold text-semi-dark line-through decoration-red-600 mr-4 cursor-default">
                    {Props.OldPrice} {Props.Currency}
                </span>
            )}
            <span className="text-sm font-semibold py-1 px-2.5 mr-4 rounded-xl text-brand-purple-light bg-brand-purple-extra-light cursor-default">
                {Props.Price} {Props.Currency}
            </span>
        </div>
    );
};

export default PriceInfo;