import { useState } from "react";
import NavigationBar from "../app/components/organisms/navigation/NavigationBar";
import SideBar from "../app/components/organisms/navigation/SideBar";
import IsMobile from "../app/hooks/universal/IsMobile";
import clsx from "clsx";
import { EuiPageBody } from "@elastic/eui";

function ProfileLayout({ children } : { children: React.ReactNode }) {
    const IsMobileUsed = IsMobile();
    const [IsNavOpen, SetIsNavOpen] = useState<boolean>(false);

    const ToggleNavigation = (IsOpen: boolean) => {
        SetIsNavOpen(IsOpen);
    };

    return (
        <div className="flex">
            <div className={clsx("flex flex-col w-screen min-h-screen h-auto bg-neutral-50", !IsMobileUsed && 'pl-[280px]')}
                //style={{background: 'rgb(243, 246, 248)'}} #f3f6f8 #fefeff
                //style={{background: '#f6f7fb'}}
            >
                <NavigationBar IsMobile={IsMobileUsed} ToggleNavigation={ToggleNavigation} />
                <EuiPageBody paddingSize="xl" restrictWidth={1200}>
                    {children}
                </EuiPageBody>
            </div>
            <SideBar IsMobile={IsMobileUsed} IsNavOpen={IsNavOpen} ToggleNavigation={ToggleNavigation} />
        </div>
    );
};

export default ProfileLayout;