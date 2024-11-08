import { authApi } from "../apis";

export function SignOutButton() {
    const { mutate } = authApi.mutation.useLogout();
    const handleSignOut = () => {
        mutate();
    };

    return (
        <button onClick={handleSignOut} className="w-full text-left">
            Log out
        </button>
    );
}
