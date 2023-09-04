import UseOnboardingLinkMutation from "../../../api/requests/payments/mutations/UseOnboardingLinkMutation";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
//max-h-[160px] bg-brand-purple-extra-light
function StripeAccountConfigureAlert() {
    const { mutate } = UseOnboardingLinkMutation();

    return (
        <div className="w-[86%] sm:w-[600px] h-auto flex flex-col my-10 px-8 sm:px-16 py-6 shadow-soft-jjt rounded-2xl bg-white mx-auto cursor-default">
            {/* <img className="w-[84%] h-[250px] mx-auto mb-6 object-cover" src="/flaticons/credit-card.png" alt="Credit card" /> */}
            <span className="icon-[majesticons--creditcard-plus-line] text-8xl text-brand-purple-light mx-auto mb-2.5"></span>
            <span className="text-lg font-bold text-brand-purple-light mx-auto text-center mb-2.5">
                Skonfiguruj swoją własną bramkę płatności
            </span>
            <div className="w-full mx-auto flex flex-col sm:flex-row items-center h-auto sm:max-h-[160px] relative"> 
                <img 
                    className="w-[55%] mx-auto h-auto sm:w-auto sm:h-[72.5%] sm:mr-7 sm:ml-0" 
                    src="/flaticons/secure-payment.png" 
                    alt="Secure payments" 
                />
                <span className="text-sm font-semibold text-brand-purple-light text-justify mt-3 mb-2.5 sm:mt-0 sm:mb-0">
                    Dzięki naszej bramce płatności powstałej we współpracy ze Stripe twoje transakcje będą mogły być bezpiecznie przetwarzane, a wypłaty realizowane na twój rachunek bankowy
                </span>
            </div>
            <MyStandardButton 
                Type="button" 
                Text="Konfiguruj płatności" 
                onClick={() => mutate()} 
                Icon="icon-[fluent--wallet-credit-card-24-regular]" 
                ClassName="mt-4 bg-brand-purple-light hover:text-dark px-8 mx-auto md:px-20 md:ml-auto md:mr-0 w-auto" 
            />
        </div>
    );
};

export default StripeAccountConfigureAlert;