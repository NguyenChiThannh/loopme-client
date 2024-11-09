import { postRequestSchema } from "../apis/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { ImageForm } from "./image-form";

interface PostCreateFormProps {
    onSubmit: (values: z.infer<typeof postRequestSchema.create>) => void;
}

export default function PostCreateForm({ onSubmit }: PostCreateFormProps) {
    const form = useForm<z.infer<typeof postRequestSchema.create>>({
        resolver: zodResolver(postRequestSchema.create),
        defaultValues: {
            content: "",
            image: null,
        },
    });

    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    // const [image, setImage] = useState<FileWithPreview | null>(null);
    // const [error, setError] = useState("");

    // const handleImageSelect = (selectedFile: FileWithPreview | null) => {
    //     setImage(selectedFile);
    // };

    const handleSubmit = form.handleSubmit((values) => {
        onSubmit(values);
    });

    return (
        <Card className="mx-auto w-full max-w-2xl py-2">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Content
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your post content here"
                                            className="min-h-[200px] py-3 text-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Upload Image (optional)
                                    </FormLabel>
                                    <FormControl>
                                        <ImageForm
                                            onImageSelect={(file) =>
                                                field.onChange(file)
                                            }
                                            selectedImage={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="text-lg">
                            Create Post
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                {form.formState.errors.root && (
                    <CardFooter>
                        <Alert variant="destructive" className="w-full">
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    </CardFooter>
                )}
            </CardFooter>
        </Card>
    );
}
