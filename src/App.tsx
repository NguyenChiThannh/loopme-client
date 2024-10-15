import { Outlet, useLoaderData } from "react-router";

function App() {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            This is Home page
            <Outlet />
        </div>
    );
}

export default App;
