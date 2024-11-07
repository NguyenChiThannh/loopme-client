export const PostEndpoints = {
    getPosts: () => "/posts",
    create: () => "/posts",
    upvote: () => "/posts/:postId/upvote",
    downvote: () => "/posts/:postId/downvote",
    removevote: () => "/posts/:postId/removevote",
    getPostsByGroupId: (groupId: string) => `/posts/group/${groupId}`,
};
