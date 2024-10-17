import { Label } from "@radix-ui/react-label";
import { AlertCircle, Upload } from "lucide-react";
import { useCallback, useState } from "react";

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

export default function PostCreateForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImage(e.dataTransfer.files[0]);
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
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
        <Card className="mx-auto w-full max-w-5xl">
            <CardHeader>
                <CardTitle className="text-3xl">Create a New Post</CardTitle>
                <CardDescription>
                    Share your thoughts with the community
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="title" className="text-lg">
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="Enter your post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="py-3 text-lg"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="content" className="text-lg">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            placeholder="Write your post content here"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[200px] py-3 text-lg"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="image" className="text-lg">
                            Upload Image (optional)
                        </Label>
                        <div
                            className={`rounded-lg border-2 border-dashed p-6 text-center ${
                                isDragging
                                    ? "border-primary"
                                    : "border-muted-foreground"
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <Label
                                htmlFor="image"
                                className="flex cursor-pointer flex-col items-center"
                            >
                                <Upload className="mb-2 h-12 w-12 text-muted-foreground" />
                                <span className="text-lg">
                                    Drag & drop an image here, or click to
                                    select
                                </span>
                            </Label>
                        </div>
                        {image && (
                            <p className="mt-2 text-sm text-muted-foreground">
                                Selected: {image.name}
                            </p>
                        )}
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                <Button onClick={handleSubmit} size="lg" className="text-lg">
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
