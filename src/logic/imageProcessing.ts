export default async function analyzeImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch("http://127.0.0.1:5000/analyse", { // you will need to change this to your own server
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

    const response = await fetch("http://127.0.0.1:5000/report", {
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
    formData.append('image', file);

    const response = await fetch("http://127.0.0.1:5000/detect", {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to detect objects in the image");
    }


    const blob = await response.blob();
    return URL.createObjectURL(blob);
}
