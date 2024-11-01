import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface NewChatModalProps {
    isOpen: boolean;
    newChatName: string;
    onNewChatNameChange: (name: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export default function NewChatModal({
    isOpen,
    newChatName,
    onNewChatNameChange,
    onClose,
    onSubmit,
}: NewChatModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="w-96">
                <CardContent className="p-4">
                    <h3 className="mb-4 text-lg font-semibold">
                        Start a New Chat
                    </h3>
                    <Input
                        className="mb-4"
                        placeholder="Enter contact name"
                        value={newChatName}
                        onChange={(e) => onNewChatNameChange(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={onSubmit}>Start Chat</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
