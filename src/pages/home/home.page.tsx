import ListSuggestedFriend from "@/features/friends/components/list-suggested-friend";
import { postApi } from "@/features/post/apis";
import ListPost from "@/features/post/components/list-post";
import RightSidebarLayout from "@/layouts/right-sidebar.layout";
import { useSocket } from "@/providers/socket-provider";

export default function HomePage() {
    const { data, error, isLoading } = postApi.query.useGetPost();
    const { notifications } = useSocket();

    if (!data || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>;
    }
    console.log(notifications);

    return (
        <section className="relative flex space-x-8">
            <div>
                {notifications.map((message, index) => (
                    <div key={index}>{JSON.stringify(message)}</div>
                ))}
            </div>
            <div className="w-[70%]">
                <ListPost posts={data.data.data} />
            </div>
            <RightSidebarLayout>
                <ListSuggestedFriend />
            </RightSidebarLayout>
        </section>
    );
}
