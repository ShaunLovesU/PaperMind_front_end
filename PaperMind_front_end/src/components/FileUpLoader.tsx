import React, { useState } from "react";

export default function FileUploader() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState("");
  const [uploaded, setUploaded] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setStatus("");
    setUploaded([]);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setStatus("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file); // FastAPI 参数名需为 'files'
    });

    try {
      setStatus("Uploading...");
      const res = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed.");
      }

      const data = await res.json();
      setStatus("Upload successful!");
      setUploaded(data.uploaded || []);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed.");
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #ccc" }}>
      <h3>Upload your documents:</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        style={{ marginLeft: "1rem", padding: "0.4rem 1rem", cursor: "pointer" }}
      >
        Upload
      </button>
      {status && <p style={{ marginTop: "0.5rem" }}>{status}</p>}
      {uploaded.length > 0 && (
        <ul>
          {uploaded.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
