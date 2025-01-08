import ImageUpload from './components/ImageUpload'
import ResultsDisplay from './components/ResultsDisplay'
import SettingsButton from './components/SettingsButton'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Object Detection Platform</h1>
      <div className="flex justify-between items-center mb-4">
        <ImageUpload />
        <SettingsButton />
      </div>
      <ResultsDisplay />
    </main>
  )
}

