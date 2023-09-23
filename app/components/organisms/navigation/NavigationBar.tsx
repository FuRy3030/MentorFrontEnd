import { useRouter } from "next/router";
import AuthState from "../../../store/auth/AuthState";
import RectangularButton from "../../atoms/buttons/RectangularButton";
import NavigationBarWarnings from "../../molecules/navigation/NavigationBarWarnings";
import UseMe from "../../../api/requests/auth/queries/UseMe";

function NavigationBar(Props: { IsMobile: boolean, ToggleNavigation: (IsOpne: boolean) => void }) {
    const { data } = UseMe();
    const { IsMobile, ToggleNavigation } = Props;
    const Router = useRouter();

    if (IsMobile) {
        return (
            <>
                <div className="flex items-center z-30 relative w-screen h-auto bg-white px-1 border-b border-gray-200 border-solid">
                    <div className="px-3 py-2 border-r border-gray-200 border-solid">
                        <button className="flex items-center justify-center p-2.5 rounded-full w-full h-full transition-all duration-300 hover:bg-brand-purple-extra-light"
                            onClick={() => ToggleNavigation(true)}
                        >
                            <span className="icon-[uil--bars] text-2xl text-brand-purple-light"></span>
                        </button>
                    </div>
                    <div className="px-3 py-2">
                        <div className="w-auto flex flex-row gap-x-4 items-center">
                            <img className="w-[125px] h-auto mt-2 mb-0" src="/logo/competify-logo.png" alt="Logo" />
                        </div>
                    </div>
                    <RectangularButton 
                        Text="Wyloguj"
                        Icon="icon-[ion--power]"
                        OnClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('expiration');
                            AuthState.IsLogged = false;
                            Router.push("/auth/login");
                        }}
                        ClassName="ml-auto mr-2"
                    />
                </div>
                <NavigationBarWarnings 
                    VerificationWarning={!data?.IsVerified} 
                    PaymentsWarning={!data?.IsStripeVerified} 
                    ProfileWarning={!data?.IsProfileConfigured}
                    ScheduleWarning={!data?.IsScheduleConfigured}
                    PricingWarning={!data?.IsPricingConfigured}
                />
            </>
        );
    } else {
        return (
            <>
                <div className="flex items-center z-30 relative h-auto bg-white px-1 border-b border-gray-200 border-solid"
                    style={{width: 'calc(100vw - 280px)'}}>
                    <div className="px-6 py-3 flex flex-col gap-y-0 max-w-xl cursor-default">
                        <h2 className="text-2xl font-extrabold text-deep-dark mb-0">Witaj, {data?.FirstName}</h2>
                        <h6 className="text-base font-semibold text-semi-dark">Stwórzmy razem najlepszy tutoring do olimpiady</h6>
                    </div>
                    <RectangularButton 
                        Text="Wyloguj"
                        Icon="icon-[ion--power]"
                        OnClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('expiration');
                            AuthState.IsLogged = false;
                            Router.push("/auth/login");
                        }}
                        ClassName="ml-auto mr-6"
                    />
                </div>
                <NavigationBarWarnings 
                    VerificationWarning={!data?.IsVerified} 
                    PaymentsWarning={!data?.IsStripeVerified}
                    ProfileWarning={!data?.IsProfileConfigured}
                    ScheduleWarning={!data?.IsScheduleConfigured}
                    PricingWarning={!data?.IsPricingConfigured}
                />
            </>
        );
    }
};

export default NavigationBar;