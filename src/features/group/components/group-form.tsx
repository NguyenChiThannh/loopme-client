import { groupApi } from "../apis";
import { groupRequestSchema } from "../apis/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type GroupFormProps = {
    initialData?: {
        id: string;
        title: string;
        backgroundCover?: string;
        isPublic: boolean;
    };
    onSubmit: () => void;
};

export default function GroupForm(
    { initialData, onSubmit }: GroupFormProps = { onSubmit: () => {} },
) {
    const form = useForm<z.infer<typeof groupRequestSchema.create>>({
        resolver: zodResolver(groupRequestSchema.create),
        defaultValues: {
            name: "",
            background_cover: null,
            isPublic: false,
        },
    });
    const { mutate: createGroup } = groupApi.mutation.useCreateGroup();
    const [previewUrl, setPreviewUrl] = useState(
        initialData?.backgroundCover || "",
    );

    const isUpdateMode = !!initialData;

    const handleBackgroundCoverChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = form.handleSubmit((values) => {
        createGroup(values);
        onSubmit();
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {initialData ? "Update Group" : "Create Group"}
                </Button>
            </form>
        </Form>
    );
}
