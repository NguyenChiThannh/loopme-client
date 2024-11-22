import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <main className="container mt-10 w-full lg:grid lg:min-h-[600px] lg:grid-cols-3 xl:min-h-[800px]">
            <div className="col-span-2 hidden w-full rounded-l-xl bg-muted lg:block">
                <img
                    src="/social.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <Outlet />
        </main>
    );
}
