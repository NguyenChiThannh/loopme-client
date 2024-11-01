import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type GroupFormProps = {
    initialData?: {
        id: string;
        title: string;
        backgroundCover?: string;
        isPublic: boolean;
    };
    onSubmit: (data: FormData) => void;
};

export default function GroupForm(
    { initialData, onSubmit }: GroupFormProps = { onSubmit: () => {} },
) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [backgroundCover, setBackgroundCover] = useState<File | null>(null);
    const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);
    const [previewUrl, setPreviewUrl] = useState(
        initialData?.backgroundCover || "",
    );

    const isUpdateMode = !!initialData;

    const handleBackgroundCoverChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setBackgroundCover(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        if (backgroundCover) {
            formData.append("backgroundCover", backgroundCover);
        }
        formData.append("isPublic", isPublic.toString());
        if (isUpdateMode) {
            formData.append("id", initialData.id);
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Group Name</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="backgroundCover">
                    Background Cover (optional)
                </Label>
                <Input
                    id="backgroundCover"
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundCoverChange}
                />
                {previewUrl && (
                    <div className="mt-2">
                        <img
                            src={previewUrl}
                            alt="Background cover preview"
                            className="h-auto max-w-full rounded"
                        />
                    </div>
                )}
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="isPublic"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                />
                <Label htmlFor="isPublic">Public Group</Label>
            </div>
            <Button type="submit" className="w-full">
                {initialData ? "Update Group" : "Create Group"}
            </Button>
        </form>
    );
}
