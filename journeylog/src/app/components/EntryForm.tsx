// src/components/EntryForm.tsx
import { useState } from 'react';
import { saveEntryOffline } from '../utils/indexedDB';

const EntryForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!photo) {
      alert('Please upload a photo');
      return;
    }
  
    const entry = { title, description, photo, date: new Date().toISOString() };
  
    // Check if online
    if (navigator.onLine) {
      const formData = new FormData();
      formData.append('file', photo);
      formData.append('title', title);
      formData.append('description', description);
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          alert('Journal entry saved successfully!');
        } else {
          alert('Error uploading entry');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error uploading entry');
      }
    } else {
      // Save entry offline
      await saveEntryOffline(entry);
      alert('Entry saved offline');
    }
  
    setTitle('');
    setDescription('');
    setPhoto(null);
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form space-y-4 p-4 bg-gray-100 rounded">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input type="file" onChange={handlePhotoChange} className="block w-full text-sm text-gray-500" />
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
        Save Entry
      </button>
    </form>
  );
};

export default EntryForm;