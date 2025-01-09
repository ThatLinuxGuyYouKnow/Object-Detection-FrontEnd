

function storePreferredDetectionModel(model: string) {
    document.cookie = `imageModel=${model}; Path=/; Secure; SameSite=Lax`;
}
