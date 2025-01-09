'use client'

import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import ResultsDisplay from './components/ResultsDisplay'
import SettingsButton from './components/SettingsButton'
import ModeSelector from './components/ModeSelector'
import AnalysisView from './components/AnalysisView'
import ReportView from './components/ReportView'

type Mode = 'general' | 'analysis' | 'report'

export default function Home() {
  const [mode, setMode] = useState<Mode>('general')

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Object Detection Platform</h1>
      <ModeSelector onModeChange={setMode} />
      <div className="flex justify-between items-center mb-4">
        <ImageUpload />
        <SettingsButton />
      </div>
      {mode === 'general' && <ResultsDisplay />}
      {mode === 'analysis' && <AnalysisView />}
      {mode === 'report' && <ReportView />}
    </main>
  )
}

