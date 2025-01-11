export default async function analyzeImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch("https://object-detection-server-bbmm.onrender.com/analyse", { // you will need to change this to your own server
        method: 'POST',
        body: formData, // Send as FormData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze image");
    }

    const result = await response.json();
    return result.data.analysis;
}

export async function generateImageReport(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch("https://object-detection-server-bbmm.onrender.com/report", {
        method: 'POST',
        body: formData, // Send as FormData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze image");
    }

    const result = await response.json();
    return result.data.report;
}

export async function detectObjects(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch("https://object-detection-server-bbmm.onrender.com/detect", {
        method: 'POST',
        body: formData, // Send as FormData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze image");
    }

    const result = await response.json();
    return result.data.objects_detected;
}


