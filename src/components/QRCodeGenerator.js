import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function QRCodeGenerator() {
  const qrRef = useRef();
  const [downloadUrl, setDownloadUrl] = useState('');

  const generateDownloadUrl = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    setDownloadUrl(pngUrl);
  };

  return (
    <>
      <div ref={qrRef} className="mb-4">
        <QRCodeCanvas value="https://emenu-sandy.vercel.app/late-cafe-ae" size={160} />
      </div>

      <a
        onClick={generateDownloadUrl}
        href={downloadUrl}
        download="e-menu-qr-code.png"
        className="bg-green-500 text-white p-2 px-4 rounded-full"
      >
        Download QR
      </a>
</>
  );
}

export default QRCodeGenerator;
