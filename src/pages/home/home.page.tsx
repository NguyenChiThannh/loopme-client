import ListSuggestedFriend from "@/features/friends/components/list-suggested-friend";
import { postApi } from "@/features/post/apis";
import ListPost from "@/features/post/components/list-post";
import RightSidebarLayout from "@/layouts/right-sidebar.layout";

export default function HomePage() {
    const { data, error, isLoading } = postApi.query.useGetPost();

    if (!data || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>;
    }

    return (
        <section className="relative flex space-x-8">
            <div className="w-[70%]">
                <ListPost posts={data.data.data} />
            </div>
            <RightSidebarLayout>
                <ListSuggestedFriend />
            </RightSidebarLayout>
        </section>
    );
}
