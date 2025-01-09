'use client'

import { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const models = [
    { id: 'yolov5', name: 'YOLOv5' },
    { id: 'fasterrcnn', name: 'Faster R-CNN' },
    { id: 'ssd', name: 'SSD' },
]

export default function ModelSelector() {
    const [selectedModel, setSelectedModel] = useState('yolov5');

    // Store the selected model in a cookie whenever it changes
    useEffect(() => {
        storePreferredDetectionModel(selectedModel);
    }, [selectedModel]);

    return (
        <div className="py-4">
            <h4 className="mb-4 text-sm font-medium">Select Detection Model</h4>
            <RadioGroup value={selectedModel} onValueChange={setSelectedModel}>
                {models.map((model) => (
                    <div key={model.id} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={model.id} id={model.id} />
                        <Label htmlFor={model.id}>{model.name}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

function storePreferredDetectionModel(model: string) {
    document.cookie = `imageModel=${model}; Path=/; Secure; SameSite=Lax`;
}