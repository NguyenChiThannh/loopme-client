import { Label } from "@radix-ui/react-label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ImageForm } from "./image-form";

interface FileWithPreview extends File {
    preview: string;
}

export default function PostCreateForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<FileWithPreview | null>(null);
    const [error, setError] = useState("");

    const handleImageSelect = (selectedFile: FileWithPreview | null) => {
        setImage(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title || !content) {
            setError("Please fill in all required fields");
            return;
        }

        // Here you would typically send a request to your API to create the post
        // For demonstration, we'll just log the post data and simulate a redirect
        console.log({ title, content, image: image?.name });

        // Simulate successful post creation
        // Redirect to home page or post list
    };

    return (
        <Card className="mx-auto w-full max-w-2xl py-2">
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="title" className="text-base">
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="Enter your post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="py-3 text-base"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="content" className="text-base">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            placeholder="Write your post content here"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[200px] py-3 text-base"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="image" className="text-base">
                            Upload Image (optional)
                        </Label>
                        <ImageForm
                            onImageSelect={handleImageSelect}
                            selectedImage={image}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                <Button onClick={handleSubmit} size="lg" className="text-base">
                    Create Post
                </Button>
                {error && (
                    <Alert variant="destructive" className="mt-4 w-full">
                        <AlertCircle className="h-5 w-5" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>
    );
}
