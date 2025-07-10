
const API="http://127.0.0.1:8000/api";

const handleDownloadCertificate = async ({
    API_BASE,
    selectedCourse,
    setCertificateLoading,
    setCertificateError,
    navigate
  }) => {
    setCertificateLoading(true);
    setCertificateError("");
  
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (!token) throw new Error('Authentication token missing. Please login again.');
  
      // Use the correct endpoint and send the token
      const res = await fetch(
        `${API}/certification/check-eligibility/?course_id=${selectedCourse.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
           
          }
        }
      );
      const data = await res.json();
  
      if (!res.ok || !data.eligible) {
        throw new Error(data.message || 'Not eligible for certificate');
      }
  
      // Compose HTML certificate
      const html = `<!DOCTYPE html>
  <html lang='en'>
  <head><meta charset='UTF-8'><title>Certificate of Completion</title></head>
  <body style='font-family:sans-serif;text-align:center;padding:40px;background:#f9fafb;'>
    <div style='max-width:600px;margin:auto;background:white;border-radius:16px;box-shadow:0 2px 16px #0001;padding:40px;'>
      <h1 style='color:#2563eb;font-size:2.5rem;margin-bottom:0.5em;'>Certificate of Completion</h1>
      <h2 style='color:#2563eb;margin-bottom:1.5em;'>Traceacademy</h2>
      <p style='font-size:1.2rem;margin-bottom:2em;'>This is to certify that</p>
      <h2 style='font-size:2rem;color:#0f172a;margin-bottom:0.5em;'>${data.user_name || 'Student'}</h2>
      <p style='font-size:1.1rem;margin-bottom:2em;'>has successfully completed the course</p>
      <h3 style='font-size:1.5rem;color:#2563eb;margin-bottom:0.5em;'>${data.course_title}</h3>
      <p style='font-size:1.1rem;margin-bottom:2em;'>Duration: <b>${data.duration || 'N/A'}</b></p>
      <p style='color:#64748b;margin-bottom:2em;'>Issued on: ${new Date().toLocaleDateString()}</p>
      <div style='margin-top:2em;'>
        <span style='font-size:0.9rem;color:#94a3b8;'>Verification Code: ${data.verification_code}</span>
      </div>
    </div>
  </body>
  </html>`;
  
      // Download as HTML file
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Traceacademy_Certificate_${data.course_title.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      // Optionally navigate after download
      if (navigate) {
        navigate('/certi');
      }
    } catch (err) {
      setCertificateError(err.message);
    } finally {
      setCertificateLoading(false);
    }
  };
  
  export default handleDownloadCertificate;