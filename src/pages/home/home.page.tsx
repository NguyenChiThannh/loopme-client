import { postApi } from "@/features/post/apis";
import ListPost from "@/features/post/components/list-post";

export default function HomePage() {
    const { data, error, isLoading } = postApi.query.useGetPost();
    if (!data || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>;
    }
    console.log(data.data);

    return <ListPost posts={data.data.data} />;
}
