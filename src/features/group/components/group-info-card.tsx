import { Award, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function GroupInfoCard() {
    const memberNumber = 1123;
    const createdAt = "12/12/2024";
    const avatarSrc = "123";
    const members = 123;
    const online = 123;
    const description = 123;
    const name = "1234";
    return (
        <Card className="sticky max-h-fit top-20">
            <div className="flex flex-col space-y-2 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage
                                src={avatarSrc}
                                alt={`${name} subreddit avatar`}
                            />
                            <AvatarFallback>
                                {name[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="text-sm font-semibold">r/{name}</h4>
                            <p className="text-xs text-muted-foreground">
                                {members.toLocaleString()} members
                            </p>
                        </div>
                    </div>
                    <Button className="ml-auto">Join</Button>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
                <Separator />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {online.toLocaleString()} online
                    </div>
                    <div className="flex items-center">
                        <Award className="mr-1 h-3 w-3" />
                        Top 1% of all communities
                    </div>
                </div>
            </div>
        </Card>
    );
}
