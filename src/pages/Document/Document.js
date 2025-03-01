function Document() {
    const handleDownload = () => {
        const content = 'Đây là nội dung của file tải xuống.';
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h1>Document</h1>
            <button onClick={handleDownload}>Tải xuống</button>
        </div>
    );
}

export default Document;
