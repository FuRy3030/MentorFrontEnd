import clsx from "clsx";

interface NavigationBarWarningsProps {
    VerificationWarning?: boolean;
    PaymentsWarning?: boolean;
    ProfileWarning?: boolean;
    ScheduleWarning?: boolean;
    PricingWarning?: boolean;
    ClassName?: string;
};

function NavigationBarWarnings(Props: NavigationBarWarningsProps) {
    if (Props.VerificationWarning || Props.PaymentsWarning || Props.PricingWarning || 
        Props.ProfileWarning || Props.ScheduleWarning) 
    {
        return (
            <div className={clsx("flex flex-col items-center px-4 md:px-7 py-1 bg-error-alert w-full z-30", Props.ClassName)}>
                {Props.VerificationWarning && 
                    <div className="flex flex-row gap-x-3 items-center my-3 cursor-default w-full">
                        <span className="icon-[mi--circle-warning] text-2xl text-error-alert"></span>
                        <span className="text-xs font-bold text-error-alert flex-1">
                            Twoje konto nie zostało jeszcze zweryfikowane. Musisz skontaktować się z nami i przesłać skany potwierdzające twoje osiągnięcia w olimpiadach
                        </span>
                    </div>
                }
                {Props.PaymentsWarning &&
                    <div className="flex flex-row gap-x-3 items-center my-2 cursor-default w-full">
                        <span className="icon-[mi--circle-warning] text-2xl text-error-alert"></span>
                        <span className="text-xs font-bold text-error-alert flex-1">
                            Płatności nie zostały jeszcze skonfigurowane. Odwiedź sekcję płatności aby aktywować swoje konto obsługujące transakcje i wypłaty
                        </span>
                    </div>
                }
                {Props.ProfileWarning &&
                    <div className="flex flex-row gap-x-3 items-center my-2 cursor-default w-full">
                        <span className="icon-[mi--circle-warning] text-2xl text-error-alert"></span>
                        <span className="text-xs font-bold text-error-alert flex-1">
                            Nie uzupełniłeś jeszcze swojego profilu. Odwiedź sekcję profil tutora aby uzupełnić informacje o sobie
                        </span>
                    </div>
                }
                {Props.ScheduleWarning &&
                    <div className="flex flex-row gap-x-3 items-center my-2 cursor-default w-full">
                        <span className="icon-[mi--circle-warning] text-2xl text-error-alert"></span>
                        <span className="text-xs font-bold text-error-alert flex-1">
                            Nie uzupełniłeś jeszcze swojego harmonogramu. Odwiedź sekcję harmonogram tutora aby uzupełnić swój terminarz
                        </span>
                    </div>
                }
                {Props.PricingWarning &&
                    <div className="flex flex-row gap-x-3 items-center my-2 cursor-default w-full">
                        <span className="icon-[mi--circle-warning] text-2xl text-error-alert"></span>
                        <span className="text-xs font-bold text-error-alert flex-1">
                            Twój cennik jest pusty lub nie zawiera wybranych przez Ciebie olimpiad w sekcji profil. Odwiedź sekcję cennik aby go uzupełnić
                        </span>
                    </div>
                }
            </div>
        );
    } 

    return null;
};

export default NavigationBarWarnings;