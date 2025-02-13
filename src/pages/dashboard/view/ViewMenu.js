import React, { useEffect, useState } from 'react'
import QRCodeGenerator from '../../../components/QRCodeGenerator'
import { useSelector } from 'react-redux';
import slugify from 'slugify';

function ViewMenu() {
  const [qrLink, setQrLink] = useState('')
  const restaurantData = useSelector((state) => state.info.data);

  useEffect(() => {
    const name = restaurantData.name
    if (name) {
      const restaurantSlug = slugify(name, { lower: true });
      const menuLink = `https://www.qr.cloudymenu.com/${restaurantSlug}`;
      setQrLink(menuLink);
    }
  }, [restaurantData.name]);
  return (
    <>
    <div className="flex flex-col items-center sm:items-start justify-center pt-4 sm:pt-6 px-3">
        <QRCodeGenerator value={qrLink}  />
      </div>

    </>
  )
}

export default ViewMenu
