<template>
    <div class="loading-extension">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading extensions...</p>
    </div>
</template>

<style>
.loading-extension {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loading-text {
    margin-top: 10px;
    font-size: 18px;
    color: #333;
}
</style>
