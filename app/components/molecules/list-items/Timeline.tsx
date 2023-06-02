import { EuiTimeline, EuiTimelineProps } from "@elastic/eui";

interface TimelineProps {
    Items: EuiTimelineProps['items'];
}

function Timeline(Props: TimelineProps) {
    return (
        <EuiTimeline items={Props.Items} aria-label="Timeline" />
    );
};

export default Timeline;