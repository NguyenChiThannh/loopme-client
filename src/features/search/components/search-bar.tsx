import { searchParams } from "../apis/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { Input } from "@/components/ui/input";

export function SearchBar() {
    const form = useForm<z.infer<typeof searchParams>>({
        resolver: zodResolver(searchParams),
        defaultValues: {
            q: null,
        },
    });
    const navigate = useNavigate();

    const handleSubmit = form.handleSubmit((values) => {
        if (!values.q) return;
        navigate(`/search?q=${encodeURIComponent(values.q)}`);
    });

    return (
        <form onSubmit={handleSubmit}>
            <Input
                {...form.register("q")}
                type="search"
                placeholder="Search"
                className="w-full bg-muted"
            />
        </form>
    );
}
