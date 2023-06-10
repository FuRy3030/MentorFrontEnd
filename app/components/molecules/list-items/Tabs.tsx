import { EuiTab, EuiTabs } from "@elastic/eui";
import { useMemo, useState } from "react";

interface Tab {
    Id: string;
    Name: string;
    Href?: string;
    Content: React.ReactNode;
    Disabled?: boolean;
    Prepend?: React.ReactNode;
    Append?: React.ReactNode;
}

interface TabsProps {
    Tabs: Tab[];
    Expanded?: boolean;
    Size: "s" | "m" | "l" | "xl";
    DefaultTab: string;
}

function Tabs(Props: TabsProps) {
    const [SelectedTabId, SetSelectedTabId] = useState<string>(Props.DefaultTab);
    const SelectedTabContent = useMemo(() => {
        return Props.Tabs.find((Tab) => Tab.Id === SelectedTabId)?.Content;
    }, [SelectedTabId]);
  
    const onSelectedTabChanged = (Id: string) => {
        SetSelectedTabId(Id);
    };
  
    const renderTabs = () => {
        return Props.Tabs.map((Tab, Index) => (
            <EuiTab
                key={Index}
                href={Tab.Href}
                onClick={() => onSelectedTabChanged(Tab.Id)}
                isSelected={Tab.Id === SelectedTabId}
                disabled={Tab.Disabled}
                prepend={Tab.Prepend}
                append={Tab.Append}
            >
                {Tab.Name}
            </EuiTab>
        ));
    };
  
    return (
        <>
            <EuiTabs expand={Props.Expanded} size={Props.Size}>{renderTabs()}</EuiTabs>
            {SelectedTabContent}
        </>
    );
};

export default Tabs;