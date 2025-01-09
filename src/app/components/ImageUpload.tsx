'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from 'lucide-react'
import analyzeImage from '@/logic/analyzeImage'

type Mode = 'general' | 'analysis' | 'report'

interface ImageUploadProps {
    mode: Mode
}

export default function ImageUpload({ mode }: ImageUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null
        setSelectedFile(file)
    }

    const handleUpload = async () => {
        if (selectedFile) {
            console.log('Uploading file:', selectedFile.name)
            try {
                let result
                switch (mode) {
                    case 'general':
                        result = await analyzeImage(selectedFile)
                        break

                }
                alert(JSON.stringify(result, null, 2))
            } catch (error) {
                console.error('Error processing image:', error)
                alert('Failed to process image')
            }
            setSelectedFile(null)
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="max-w-sm"
            />
            <Button onClick={handleUpload} disabled={!selectedFile}>
                <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
        </div>
    )
}

