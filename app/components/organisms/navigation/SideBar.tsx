import SideBarLinksSection from "../../molecules/navigation/SideBarLinksSection";
import clsx from "clsx";

function SideBar(Props: { IsMobile: boolean, IsNavOpen: boolean, ToggleNavigation: (IsOpne: boolean) => void }) {
    const { IsMobile, IsNavOpen, ToggleNavigation } = Props;

    if (IsMobile) {
        return (
            <>
                <div className={clsx("fixed top-0 w-[280px] h-screen bg-white shadow-lg px-6 py-6 z-50 transition-all duration-300 border-r border-gray-200 border-solid", 
                    IsNavOpen ? "left-0" : "left-[-280px]")}
                >
                    <span className="icon-[material-symbols--close-rounded] absolute top-3 right-3 text-2xl text-brand-purple" onClick={() => ToggleNavigation(false)}></span>
                    <div className="w-full flex flex-col pb-2 mb-5 border-b border-gray-200 border-solid">
                        <img className="w-[150px] h-auto mb-0" src="/logo/competify-logo.png" alt="Logo" />
                        <span className="text-xs text-semi-dark-alt font-semibold cursor-default">Łączymy uczniów z laureatami olimpiad</span>
                    </div>
                    <SideBarLinksSection
                        Heading="Kokpit"
                        Links={[
                            {
                                To: "/",
                                Text: "Dashboard",
                                Icon: 'icon-[material-symbols--dashboard]'
                            }
                        ]}
                    />
                    <SideBarLinksSection
                        Heading="O mnie"
                        Links={[
                            {
                                To: "/profile",
                                Text: "Profil tutora",
                                Icon: 'icon-[material-symbols--account-circle]'
                            },
                            {
                                To: "/schedule",
                                Text: "Harmonogram",
                                Icon: 'icon-[material-symbols--auto-schedule]'
                            }
                        ]}
                    />
                    <SideBarLinksSection
                        Heading="Moi uczniowie"
                        Links={[
                            // {
                            //     To: "/students",
                            //     Text: "Uczniowie",
                            //     Icon: 'icon-[ph--student]'
                            // },
                            {
                                To: "/meetings",
                                Text: "Zajęcia",
                                Icon: 'icon-[healthicons--group-discussion-meetingx3-outline]'
                            }
                        ]}
                    />
                    <SideBarLinksSection
                        Heading="Płatności"
                        Links={[
                            {
                                To: "/pricing",
                                Text: "Cennik",
                                Icon: 'icon-[solar--hand-money-linear]'
                            },
                            {
                                To: "/payments",
                                Text: "Historia",
                                Icon: 'icon-[material-symbols--manage-history]'
                            }
                        ]}
                    />
                </div>
                {IsNavOpen && <div 
                    className="fixed w-screen h-screen top-0 left-0 z-40" 
                    style={{background: 'rgba(0, 0, 0, 0.5)'}}
                    onClick={() => ToggleNavigation(false)} 
                />}
            </>
        );
    } else {
        return (
            <div className="fixed top-0 left-0 w-[280px] h-screen bg-white shadow-lg px-6 py-6 border-r border-gray-200 border-solid">
                <div className="w-full flex flex-col pb-2 mb-5 border-b border-gray-200 border-solid">
                    <img className="w-[150px] h-auto mb-0" src="/logo/competify-logo.png" alt="Logo" />
                    <span className="text-xs text-semi-dark-alt font-semibold cursor-default">Łączymy uczniów z laureatami olimpiad</span>
                </div>
                <SideBarLinksSection
                    Heading="Kokpit"
                    Links={[
                        {
                            To: "/",
                            Text: "Dashboard",
                            Icon: 'icon-[material-symbols--dashboard]'
                        }
                    ]}
                />
                <SideBarLinksSection
                    Heading="O mnie"
                    Links={[
                        {
                            To: "/profile",
                            Text: "Profil tutora",
                            Icon: 'icon-[material-symbols--account-circle]'
                        },
                        {
                            To: "/schedule",
                            Text: "Harmonogram",
                            Icon: 'icon-[material-symbols--auto-schedule]'
                        }
                    ]}
                />
                <SideBarLinksSection
                    Heading="Moi uczniowie"
                    Links={[
                        {
                            To: "/students",
                            Text: "Uczniowie",
                            Icon: 'icon-[ph--student]'
                        },
                        {
                            To: "/meetings",
                            Text: "Zajęcia",
                            Icon: 'icon-[healthicons--group-discussion-meetingx3-outline]'
                        }
                    ]}
                />
                <SideBarLinksSection
                    Heading="Płatności"
                    Links={[
                        {
                            To: "/pricing",
                            Text: "Cennik",
                            Icon: 'icon-[solar--hand-money-linear]'
                        },
                        {
                            To: "/payments",
                            Text: "Historia",
                            Icon: 'icon-[material-symbols--manage-history]'
                        }
                    ]}
                />
            </div>
        );
    }
};

export default SideBar;