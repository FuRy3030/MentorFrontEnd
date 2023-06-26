import IntroductionHeader from "../../molecules/typography/IntroductionHeader";

interface PageHeaderProps {
    UpperHeader?: string;
    Header: string;
    Paragraphs: string[];
    ImageSrc: string;
    ImageAlt: string;
    children?: React.ReactNode;
}

function PageHeader(Props: PageHeaderProps) {
    return (
        <div className="w-full bg-white relative">
            <div className="flex flex-row justify-between flex-wrap w-full px-8 md:px-11 py-8 max-w-[1050px] mx-auto">
                <IntroductionHeader 
                    UpperHeader={Props.UpperHeader}
                    Header={Props.Header}
                    Paragraphs={Props.Paragraphs}
                    ClassName="mb-6 w-[100%] lg:mb-0 lg:w-[50%]"
                />
                <div className="relative w-[100%] lg:w-[47.5%]">
                    {Props.children}
                    <img 
                        className="w-[100%]" 
                        src={Props.ImageSrc} 
                        alt={Props.ImageAlt} 
                    />
                </div>
            </div>
        </div>
    );
};

export default PageHeader;