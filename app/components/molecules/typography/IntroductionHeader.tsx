import clsx from "clsx";

interface IntroductionHeaderProps {
    UpperHeader?: string;
    Header: string;
    Paragraphs: string[];
    ClassName?: string;
};

function IntroductionHeader(Props: IntroductionHeaderProps) {
    return (
        <div className={clsx("flex flex-col w-auto cursor-default", Props.ClassName)}>
            {Props.UpperHeader && <h5 className="text-lg font-bold text-neon-light-blue mb-2.5">{Props.UpperHeader}</h5>}
            <h2 className="text-4xl font-extrabold text-dark mb-2.5">{Props.Header}</h2>
            {Props.Paragraphs.map((Paragraph, Index) => (
                <p key={Index} className="text-base font-semibold text-semi-dark-alt mb-2">{Paragraph}</p>
            ))}
        </div>
    );
};

export default IntroductionHeader;