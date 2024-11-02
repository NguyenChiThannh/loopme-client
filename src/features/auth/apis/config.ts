export const AuthEndpoints = {
    refreshToken: () => "product/me",
    login: (id: string | number) => `product/${id}`,
    signup: (orderToken: string) =>
        `/product/order-products?token=${orderToken}`,
};
