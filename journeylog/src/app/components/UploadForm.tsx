import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 text-white py-2 px-4 rounded">
        Upload
      </button>
    </div>
  );
}