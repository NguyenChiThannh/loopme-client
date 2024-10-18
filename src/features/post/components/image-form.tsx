import { Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";

import DragDropArea from "./drag-drop-area";

interface FileWithPreview extends File {
    preview: string;
}

interface ImageFormProps {
    onImageSelect: (file: FileWithPreview | null) => void;
    selectedImage: FileWithPreview | null;
}

export function ImageForm({ onImageSelect, selectedImage }: ImageFormProps) {
    const handleFile = useCallback(
        (selectedFile: File) => {
            if (selectedFile.type.startsWith("image/")) {
                const fileWithPreview = Object.assign(selectedFile, {
                    preview: URL.createObjectURL(selectedFile),
                });
                onImageSelect(fileWithPreview);
            }
        },
        [onImageSelect],
    );

    const removeFile = () => {
        if (selectedImage) {
            URL.revokeObjectURL(selectedImage.preview);
            onImageSelect(null);
        }
    };

    return (
        <>
            <DragDropArea onFileSelect={handleFile}>
                {selectedImage ? (
                    <img src={selectedImage.preview} alt={selectedImage.name} />
                ) : (
                    <div className="flex aspect-video h-full flex-col items-center justify-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-400">
                            Drag and drop your image here, or click to select a
                            file
                        </p>
                    </div>
                )}
            </DragDropArea>
            {selectedImage && (
                <div className="mt-6">
                    <div className="flex items-center space-x-4">
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                {selectedImage.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {(selectedImage.size / 1024 / 1024).toFixed(2)}{" "}
                                MB
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={removeFile}
                            aria-label={`Remove ${selectedImage.name}`}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
