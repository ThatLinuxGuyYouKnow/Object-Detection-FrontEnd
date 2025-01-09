export default function storePreferredDetectionModel(model: string) {
    const preferredModel = localStorage.getItem('imageModel') || 'yolov5';
}