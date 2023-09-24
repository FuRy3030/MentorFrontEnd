import { useFormContext } from "react-hook-form";
import MyNumberField from "../../atoms/forms/MyNumberField";
import PriceInfo from "../list-items/PriceInfo";

interface PricingBoxForEducationalServiceProps {
    Name?: string;
    Color?: string;
    Logo?: string;
    OrderIdentifier: number;
}

function PricingBoxForEducationalService(Props: PricingBoxForEducationalServiceProps) {
    const { setValue, watch } = useFormContext();

    return (
        <div className="my-10 p-6 shadow-soft-jjt rounded-lg bg-white w-full">
            <div className="flex flex-col lg:flex-row items-start mb-5 pb-4 border-b-2 border-gray-200 border-solid">
                <img src={Props.Logo} alt="Logo olimpiady" className="w-full h-auto mb-4 max-w-[370px] mx-auto lg:h-14 lg:w-auto lg:ml-0 lg:mr-5 lg:mb-0" />
                <div className="flex flex-col cursor-default">
                    <h3 className="flex items-center text-xl font-bold text-dark mb-1" style={{ color: Props.Color }}>
                        {Props.Name}
                        <span className="text-sm font-semibold py-1 px-2.5 ml-4 rounded-xl text-normal-blue bg-extremely-light-blue">
                            Bezpłatna godzina próbna
                        </span>
                    </h3>
                    <span className="text-sm font-semibold text-semi-dark">
                        Poniżej znajdziesz swój cennik wyłącznie do: {Props.Name}
                    </span>
                </div>
            </div>
            <MyNumberField
                Label="Cena za pojedyńcze zajęcia z uczniem" 
                Name={`${Props.OrderIdentifier}.BasePriceNoFee`}
                OnChangeWithVal={(Value: number) => setValue(`${Props.OrderIdentifier}.BasePrice`, Value * 1.4)}
                Placeholder="Wpisz swoją cenę, którą chcesz zaproponować uczniom"
                HelpText="Wprowadzona cena stanowi podstawę do wyliczenia wartości pozostałych pakietów dla tej olimpiady. Sprzedaż pakietów wiąże się z obniżką ceny dla ucznia"
                Icon="payment"
                Append="PLN"
                FullWidth
            />
            <div className="flex flex-row items-center mb-1 mt-4">
                <span className="text-base font-semibold text-dark mr-3 cursor-default">
                    Stawki za usługi
                </span>
                <div className="flex-1 w-auto bg-gray-200 h-0.5">

                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-between">
                <PriceInfo
                    ServiceName="Zajęcia z uczniem"
                    Price={watch(`${Props.OrderIdentifier}.BasePriceNoFee`)}
                    Currency="PLN"
                    ClassName="w-full md:w-[47.5%]"
                />
                <PriceInfo
                    ServiceName="Godzina próbna"
                    Price={0}
                    Currency="PLN"
                    ClassName="w-full md:w-[47.5%]"
                />
                <PriceInfo
                    ServiceName="Pakiet podwójny"
                    Price={Number((watch(`${Props.OrderIdentifier}.BasePriceNoFee`) * 1.96).toFixed(2))}
                    OldPrice={Number((watch(`${Props.OrderIdentifier}.BasePriceNoFee`) * 2).toFixed(2))}
                    Currency="PLN"
                    ClassName="w-full md:w-[47.5%]"
                    IsHotOffer
                    Switch={{
                        Label: "Pakiet podwójny",
                        Name: `${Props.OrderIdentifier}.IsDoublePackagePriceActive`,
                        HideLabel: true,
                        ClassName: 'ml-4 my-3'
                    }}
                />
                <PriceInfo
                    ServiceName="Pakiet potrójny"
                    Price={Number((watch(`${Props.OrderIdentifier}.BasePriceNoFee`) * 2.91).toFixed(2))}
                    OldPrice={Number((watch(`${Props.OrderIdentifier}.BasePriceNoFee`) * 3).toFixed(2))}
                    Currency="PLN"
                    ClassName="w-full md:w-[47.5%]"
                    IsHotOffer
                    Switch={{
                        Label: "Pakiet potrójny",
                        Name: `${Props.OrderIdentifier}.IsTriplePackagePriceActive`,
                        HideLabel: true,
                        ClassName: 'ml-4 my-3'
                    }}
                />
                <PriceInfo
                    ServiceName="Pakiet 5"
                    Price={Number((watch(`${Props.OrderIdentifier}.BasePriceNoFee`) * 4.75).toFixed(2))}
                    OldPrice={Number((watch(`${Props.OrderIdentifier}.BasePriceNoFee`) * 5).toFixed(2))}
                    Currency="PLN"
                    ClassName="w-full md:w-[47.5%]"
                    IsHotOffer
                    Switch={{
                        Label: "Pakiet 5",
                        Name: `${Props.OrderIdentifier}.IsFivePackagePriceActive`,
                        HideLabel: true,
                        ClassName: 'ml-4 my-3'
                    }}
                />
                <PriceInfo
                    ServiceName="Pakiet 10"
                    Price={Number((watch(`${Props.OrderIdentifier}.BasePriceNoFee`) * 9).toFixed(2))}
                    OldPrice={Number((watch(`${Props.OrderIdentifier}.BasePriceNoFee`) * 10).toFixed(2))}
                    Currency="PLN"
                    ClassName="w-full md:w-[47.5%]"
                    IsHotOffer
                    Switch={{
                        Label: "Pakiet 10",
                        Name: `${Props.OrderIdentifier}.IsTenPackagePriceActive`,
                        HideLabel: true,
                        ClassName: 'ml-4 my-3'
                    }}
                />
            </div>
        </div>
    );
};

export default PricingBoxForEducationalService;