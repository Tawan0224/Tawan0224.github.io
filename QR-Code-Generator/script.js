class QRCodeGenerator {
    constructor() {
        this.currentQR = null;
        this.currentSize = 200;
        this.currentData = '';
        this.initializeEventListeners();
        this.initializeTheme();
    }

    initializeEventListeners() {
        const form = document.getElementById('qrForm');
        const sizeOptions = document.querySelectorAll('.size-option');
        const downloadPng = document.getElementById('downloadPng');
        const downloadSvg = document.getElementById('downloadSvg');
        const themeToggle = document.getElementById('themeToggle');

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        sizeOptions.forEach(option => {
            option.addEventListener('click', (e) => this.handleSizeChange(e));
        });

        downloadPng.addEventListener('click', () => this.downloadPNG());
        downloadSvg.addEventListener('click', () => this.downloadSVG());
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    initializeTheme() {
        // Check for saved theme or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle animation effect
        document.body.style.transition = 'all 0.3s ease';
        
        // Update QR code colors if one exists
        if (this.currentData) {
            setTimeout(() => {
                this.generateQRCode(this.currentData);
            }, 150);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const urlInput = document.getElementById('urlInput');
        const data = urlInput.value.trim();

        if (!data) {
            this.showError('Please enter some text or URL');
            return;
        }

        this.currentData = data;
        this.generateQRCode(data);
    }

    handleSizeChange(e) {
        const sizeOptions = document.querySelectorAll('.size-option');
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        e.target.classList.add('active');
        
        this.currentSize = parseInt(e.target.dataset.size);
        
        if (this.currentData) {
            this.generateQRCode(this.currentData);
        }
    }

    generateQRCode(data) {
        try {
            this.hideError();
            this.showLoading();

            // Clear previous QR code
            const qrCodeContainer = document.getElementById('qrCode');
            qrCodeContainer.innerHTML = '';

            // Create new QR code
            const canvas = document.createElement('canvas');
            qrCodeContainer.appendChild(canvas);

            // Get theme-appropriate colors
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const background = isDark ? '#2a2a3a' : 'white';
            const foreground = isDark ? '#e0e0e0' : '#333';

            this.currentQR = new QRious({
                element: canvas,
                value: data,
                size: this.currentSize,
                level: 'M',
                background: background,
                foreground: foreground,
                padding: 20
            });

            this.showResult();
            this.hideLoading();

        } catch (error) {
            this.hideLoading();
            this.showError('Error generating QR code: ' + error.message);
        }
    }

    downloadPNG() {
        if (!this.currentQR) return;

        const canvas = this.currentQR.canvas;
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    downloadSVG() {
        if (!this.currentData) return;

        // Create SVG QR code
        const svg = this.generateSVG(this.currentData, this.currentSize);
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = 'qrcode.svg';
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    generateSVG(data, size) {
        // Simple SVG generation for QR codes
        // This is a basic implementation - for production, consider using a proper QR SVG library
        const qr = new QRious({
            value: data,
            size: size,
            level: 'M'
        });

        const canvas = document.createElement('canvas');
        const tempQR = new QRious({
            element: canvas,
            value: data,
            size: size,
            level: 'M',
            background: 'white',
            foreground: '#333'
        });

        // Convert canvas to SVG (simplified approach)
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                <rect width="100%" height="100%" fill="white"/>
                <image href="${canvas.toDataURL()}" width="${size}" height="${size}"/>
            </svg>
        `;
        
        return svgContent;
    }

    showResult() {
        const result = document.getElementById('qrResult');
        result.classList.add('show');
    }

    showLoading() {
        const btn = document.getElementById('generateBtn');
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"></span> Generating...';
    }

    hideLoading() {
        const btn = document.getElementById('generateBtn');
        btn.disabled = false;
        btn.innerHTML = 'Generate QR Code';
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    hideError() {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.style.display = 'none';
    }
}
// Initialize the QR Code Generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QRCodeGenerator();
});