import { authApi } from "../apis";

import { Button } from "@/components/ui/button";

export function SignOutButton() {
    const { mutate } = authApi.mutation.useLogout();
    const handleSignOut = () => {
        mutate();
    };

    return (
        <Button
            onClick={handleSignOut}
            className="w-full py-2 text-sm"
            variant={"ghost"}
        >
            Log out
        </Button>
    );
}
