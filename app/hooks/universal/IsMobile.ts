import { useState, useEffect } from 'react';

const IsMobile = (): boolean => {
    const [IsMobileResolution, SetIsMobileResolution] = useState<boolean>(false);

    useEffect(() => {
        const HandleResize = () => {
            SetIsMobileResolution(window.innerWidth < 768);
        };

        window.addEventListener('resize', HandleResize);
        HandleResize(); // Initial check on mount

        return () => {
            window.removeEventListener('resize', HandleResize);
        };
    }, []);

    return IsMobileResolution;
};

export default IsMobile;