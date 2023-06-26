import clsx from "clsx";
import Image from "next/image";

interface AvatarWithRingsProps {
    Src?: string;
    Width: number;
    Height: number;
    ClassName?: string;
}

function AvatarWithRings(Props: AvatarWithRingsProps) {
    return (
        <div 
            className={clsx("flex items-center justify-center bg-clip-padding rounded-full", Props.ClassName)}
            style={{ width: `${Props.Width + 50 }px`, height: `${Props.Height + 50 }px`, 
                border: '12px solid rgba(99, 91, 255, 0.15)', backgroundColor: 'rgba(99, 91, 255, 0.3)' }}
        >
            <Image
                src={Props.Src ?? '/flaticons/user.png'}
                style={{ width: `${Props.Width}px`, height: `${Props.Height}px` }}  
                className="rounded-full object-cover bg-white"
                width={Props.Width}
                height={Props.Height}
                alt="User profile image"
            />
        </div>
    );
};

export default AvatarWithRings;