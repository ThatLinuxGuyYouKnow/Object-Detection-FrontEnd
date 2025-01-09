'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

type Mode = 'general' | 'analysis' | 'report'

interface ModeSelectorProps {
    onModeChange: (mode: Mode) => void
}

export default function ModeSelector({ onModeChange }: ModeSelectorProps) {
    const [activeMode, setActiveMode] = useState<Mode>('general')

    const handleModeChange = (mode: Mode) => {
        setActiveMode(mode)
        onModeChange(mode)
    }

    return (
        <div className="flex space-x-2 mb-4">
            <Button
                variant={activeMode === 'general' ? 'default' : 'outline'}
                onClick={() => handleModeChange('general')}
            >
                General Detection
            </Button>
            <Button
                variant={activeMode === 'analysis' ? 'default' : 'outline'}
                onClick={() => handleModeChange('analysis')}
            >
                Analysis
            </Button>
            <Button
                variant={activeMode === 'report' ? 'default' : 'outline'}
                onClick={() => handleModeChange('report')}
            >
                Report
            </Button>
        </div>
    )
}

