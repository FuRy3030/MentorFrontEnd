import PriceRange from "../app/components/atoms/miscellaneous_and_decorations/PriceRange";
import IntroductionHeader from "../app/components/molecules/typography/IntroductionHeader";
import PricingForm from "../app/components/organisms/forms/PricingForm";
import PageHeader from "../app/components/organisms/page_parts/PageHeader";

function Page() {
    return (
        <>
            <PageHeader
                UpperHeader="Mój własny cennik zajęć"
                Header="Stawki zawsze dopasowane do twoich oczekiwań"
                Paragraphs={[
                    "Dla każdej z wybranych przez siebie olimpiad możesz ustalać indywidualne stawki godzinowe. Personalizuj je według dowolnie dobranych kategorii - oczekiwań uczniów, własnej wiedzy i / lub osiągnięć, metod nauki czy przygotowanych materiałów dydaktycznych.",
                    "Swoje godziny lekcyjne możesz sprzedawać w pakietach. Wybierz z dostępnych rodzajów i aktywuj te, które najbardziej ci odpowiadają. Pamiętaj, że sprzedaż zajęć w ramach pakietów łączy się ze zniżkami."
                ]}
                ImageSrc="/illustrated/PricingPayment.jpg"
                ImageAlt="Payments"
            >
                <>
                    <PriceRange Text="Geografia: 100 - 140 PLN" ClassName="absolute top-2.5 right-14" />
                    <PriceRange Text="Matematyka: 160 - 200 PLN" ClassName="absolute top-20 left-10" />
                    <PriceRange Text="Ekonomia: 90 - 180 PLN" ClassName="absolute top-36 right-0" />
                    <PriceRange Text="Filozofia: 80 - 220 PLN" ClassName="absolute bottom-6 right-4" />
                </>
            </PageHeader>
            <h1 className="mt-10 text-4xl text-dark font-bold cursor-default text-center mx-auto px-6">
                Moje stawki za usługi
            </h1>
            <PricingForm />
        </>
    );
};

export default Page;