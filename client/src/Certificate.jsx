import { useState, useEffect } from 'react';
import axios from 'axios';

function CertificatesList() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('/api/certificates/');
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []);

  const downloadCertificate = async (certificateId) => {
    try {
      const response = await axios.get(`/api/certificates/${certificateId}/download_pdf/`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate_${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };

  return (
    <div>
      <h2>My Certificates</h2>
      {certificates.map(certificate => (
        <div key={certificate.id}>
          <h3>{certificate.quiz.title}</h3>
          <p>Score: {certificate.score}</p>
          <p>Issue Date: {new Date(certificate.issue_date).toLocaleDateString()}</p>
          <button onClick={() => downloadCertificate(certificate.id)}>
            Download Certificate
          </button>
        </div>
      ))}
    </div>
  );
}

export default CertificatesList;