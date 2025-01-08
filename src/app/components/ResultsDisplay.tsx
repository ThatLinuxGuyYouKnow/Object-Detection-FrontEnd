import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from your API or state management
const mockResults = [
    { id: 1, label: 'Person', confidence: 0.95 },
    { id: 2, label: 'Car', confidence: 0.88 },
    { id: 3, label: 'Tree', confidence: 0.72 },
]

export default function ResultsDisplay() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Detection Results</CardTitle>
            </CardHeader>
            <CardContent>
                {mockResults.length > 0 ? (
                    <ul>
                        {mockResults.map((result) => (
                            <li key={result.id} className="mb-2">
                                <span className="font-semibold">{result.label}</span>: {(result.confidence * 100).toFixed(2)}% confidence
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No objects detected. Try uploading an image.</p>
                )}
            </CardContent>
        </Card>
    )
}

