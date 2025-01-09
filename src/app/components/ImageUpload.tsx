'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from 'lucide-react'
import analyzeImage from '../../logic/analyzeImage' // Import as a named export

export default function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null
        setSelectedFile(file)
    }

    const handleUpload = async () => {
        if (selectedFile) {
            console.log('Uploading file:', selectedFile.name)
            try {
                const data = await analyzeImage(selectedFile) // Await the result
                alert(data)
            } catch (error) {
                console.error('Error analyzing image:', error)
                alert('Failed to analyze image')
            }
            // Reset selected file after upload
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