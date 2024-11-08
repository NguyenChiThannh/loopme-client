import { Award, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface GroupInfoCardProps {
    members: number;
    createdAt: string;
    name: string;
    groupId: string;
    isJoined: boolean;
}

export function GroupInfoCard({
    members,
    createdAt,
    name,
    groupId,
    isJoined,
}: GroupInfoCardProps) {
    return (
        <Card className="sticky top-20 max-h-fit">
            <div className="flex flex-col space-y-2 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h4 className="mb-2 text-sm font-semibold">
                                r/{name}
                            </h4>
                            <p className="mb-2 text-xs text-muted-foreground">
                                {members} members
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Create at{" "}
                                {new Date(createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    },
                                )}
                            </p>
                        </div>
                    </div>
                    {!isJoined && <Button className="ml-auto">Join</Button>}
                </div>
            </div>
        </Card>
    );
}
