import React from 'react'
import QRCodeGenerator from '../../../components/QRCodeGenerator'

function ViewMenu() {
  return (
    <>
    <div className="flex flex-col items-start justify-center pt-6 px-3">
        <QRCodeGenerator />
      </div>
    </>
  )
}

export default ViewMenu