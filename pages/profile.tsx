import ProfileImageUploadBox from "../app/components/organisms/files/ProfileImageUploadBox";
import ProfileForm from "../app/components/organisms/forms/ProfileForm";

function Page() {

    return (
        <>
            <div className="px-6 w-full h-auto sm:px-8 py-6 rounded-xl bg-white">
                <ProfileImageUploadBox />
                <ProfileForm />
            </div>
        </>
    );
};

export default Page;