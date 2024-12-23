import React from "react";

const QRMenu = () => {
  const menuExamples = [
    {
      name: "Toro de Fuego",
      logo: "/path-to-logo/toro.png", // Replace with actual logo path
      qrCode: "/path-to-qr/toro-qr.png", // Replace with actual QR code path
      bgColor: "bg-red-200",
    },
    {
      name: "Seito Japan",
      logo: "/path-to-logo/seito.png",
      qrCode: "/path-to-qr/seito-qr.png",
      bgColor: "bg-gray-200",
    },
    {
      name: "Famiglia Originale",
      logo: "/path-to-logo/famiglia.png",
      qrCode: "/path-to-qr/famiglia-qr.png",
      bgColor: "bg-amber-100",
    },
    {
      name: "Beast Burger & Grill",
      logo: "/path-to-logo/beast.png",
      qrCode: "/path-to-qr/beast-qr.png",
      bgColor: "bg-yellow-200",
    },
  ];

  return (
    <div className="bg-white py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black">Online Menu Examples</h2>
        <p className="text-gray-600">
          Take a look at our online QR menu examples and get inspired
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuExamples.map((example, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4"
          >
            <div className="w-16 h-16">
              <img
                src={example.logo}
                alt={`${example.name} Logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mt-4">{example.name}</h3>
            <div
              className={`w-full h-48 ${example.bgColor} rounded-lg flex justify-center items-center mt-4`}
            >
              <img
                src={example.qrCode}
                alt={`${example.name} QR Code`}
                className="h-32 w-32 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRMenu;
