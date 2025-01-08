'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ModelSelector from './ModelSelector'

export default function SettingsButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Detection Settings</DialogTitle>
                </DialogHeader>
                <ModelSelector />
            </DialogContent>
        </Dialog>
    )
}

