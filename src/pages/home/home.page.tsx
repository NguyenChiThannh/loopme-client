import { postApi } from "@/features/post/apis";
import ListPost from "@/features/post/components/list-post";

export default function HomePage() {
    const { data, error, isLoading } = postApi.query.useGetPost();
    console.log(data);
    if (!data || isLoading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>; 
    }

    return <ListPost posts={data.data.data} />;
}
