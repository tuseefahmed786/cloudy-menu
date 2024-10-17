import React from 'react'
import QRCodeGenerator from '../../../components/QRCodeGenerator'

function ViewMenu() {
  return (
    <>
    <div className="flex flex-col items-center sm:items-start justify-center pt-4 sm:pt-6 px-3">
        <QRCodeGenerator />
      </div>
    </>
  )
}

export default ViewMenu