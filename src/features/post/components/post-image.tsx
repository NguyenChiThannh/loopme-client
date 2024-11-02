import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    imageUrl?: string;
    upvotes: number;
    commentCount: number;
    postedAt: string;
};

interface PostImageProps {
    post: Post;
    isImageModalOpen: boolean;
    setIsImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostImage({
    post,
    isImageModalOpen,
    setIsImageModalOpen,
}: PostImageProps) {
    return (
        <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
            <DialogTrigger asChild>
                <div className="relative mb-4 w-full cursor-pointer overflow-hidden rounded-md">
                    <img
                        src={post.imageUrl}
                        alt="Post image"
                        className="h-auto w-full object-cover"
                        style={{ maxHeight: "600px" }}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl p-0">
                <div className="relative h-[80vh] w-full">
                    <img
                        src={post.imageUrl}
                        alt="Enlarged post image"
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
