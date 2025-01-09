export default async function analyzeImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch("https://object-detection-server-bbmm.onrender.com/analyse", {
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