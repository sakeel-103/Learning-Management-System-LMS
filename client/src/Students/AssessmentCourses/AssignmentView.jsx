import React, { useState } from "react";

const AssignmentViewPage = ({ assignment }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setUploadMsg("Please select a file.");
      return;
    }
    setUploading(true);
    setUploadMsg("");
    const formData = new FormData();
    formData.append("file", file);
    // Optionally add student name or other fields
    // formData.append("student_name", "Student Name");

    const res = await fetch(
      `http://localhost:8000/api/v1/assessment/assignments/${assignment.id}/upload/`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (res.ok) {
      setUploadMsg("Upload successful!");
    } else {
      setUploadMsg(data.error || "Upload failed.");
    }
    setUploading(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{assignment.title}</h2>
      <p className="mb-4">{assignment.description}</p>
      <a
        href={assignment.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Download Assignment File
      </a>
      <div className="mt-6">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          {uploading ? "Uploading..." : "Upload Solution"}
        </button>
        {uploadMsg && <p className="mt-2 text-red-600">{uploadMsg}</p>}
      </div>
    </div>
  );
};

export default AssignmentViewPage;