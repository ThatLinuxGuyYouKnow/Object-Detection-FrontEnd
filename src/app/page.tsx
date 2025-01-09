'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import analyzeImage, { detectObjects, generateImageReport } from '@/logic/imageProcessing'

type Mode = 'general' | 'analysis' | 'report'

type ProcessingResult = {
  summary?: string;
  statistics?: string[];
  recommendations?: string[];
  detectedObjects?: Array<{ object: string; confidence: string }>;
  analysis?: any;
  report?: string; // Added field for the report content
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<Mode>('general')
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    setSelectedFile(file)
    setResult(null)
    setError(null)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    setError(null)

    try {
      let processedResult

      switch (mode) {
        case 'general':
          processedResult = await detectObjects(selectedFile)
          setResult({ detectedObjects: processedResult })
          break

        case 'analysis':
          processedResult = await analyzeImage(selectedFile)
          setResult({ analysis: processedResult })
          break

        case 'report':
          processedResult = await generateImageReport(selectedFile)
          setResult({ report: processedResult }) // Handle the report content
          break
      }
    } catch (error) {
      console.error('Error processing image:', error)
      setError(error instanceof Error ? error.message : 'Failed to process image')
    } finally {
      setIsLoading(false)
    }
  }

  const renderResults = () => {
    if (!result) return null

    switch (mode) {
      case 'general':
        return result.detectedObjects ? (
          <div>
            <h3 className="font-semibold mb-2">Detected Objects</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              <ul className="list-disc list-inside">
                {result.detectedObjects.map((obj, index) => (
                  <li key={index}>
                    {obj.object} (Confidence: {obj.confidence})
                  </li>
                ))}

              </ul>
            </pre>
          </div>
        ) : null

      case 'report':
        return result.report ? (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(result.report, null, 2)}
          </pre>
        ) : null


      case 'analysis':
        return result.analysis ? (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(result.analysis, null, 2)}
          </pre>
        ) : null

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Object Detection Platform</h1>

      <div className="flex space-x-4">
        <Button
          variant={mode === 'general' ? 'default' : 'outline'}
          onClick={() => setMode('general')}
        >
          General
        </Button>
        <Button
          variant={mode === 'analysis' ? 'default' : 'outline'}
          onClick={() => setMode('analysis')}
        >
          Analysis
        </Button>
        <Button
          variant={mode === 'report' ? 'default' : 'outline'}
          onClick={() => setMode('report')}
        >
          Report
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="max-w-sm"
        />
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isLoading ? 'Processing...' : 'Upload'}
        </Button>
      </div>

      {(result || error) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'general' ? 'Detection Results' :
                mode === 'analysis' ? 'Analysis Results' :
                  'Detection Report'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              renderResults()
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
