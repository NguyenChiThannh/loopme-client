import { useSearchParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

import { searchApi } from "@/features/search/apis";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    const { data } = searchApi.query.useSearchUser({
        q: q,
    });
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data?.data.data.map((user) => (
                    <Card key={user._id}>
                        <CardContent className="flex items-center p-4">
                            <img
                                src={user.avatar}
                                alt={user.displayName}
                                width={50}
                                height={50}
                                className="mr-4 rounded-full"
                            />
                            <div>
                                <h2 className="font-semibold">
                                    {user.displayName}
                                </h2>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* <div className="flex items-center justify-center mt-4">
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </Button>
                <span className="mx-2">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-2"
                    aria-label="Next page"
                >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Button>
            </div> */}
        </div>
    );
}
