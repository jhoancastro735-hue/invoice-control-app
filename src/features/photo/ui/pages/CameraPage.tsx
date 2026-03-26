import "./CameraPage.css"
import { takePhoto, selectFromGallery } from "../../infrastructure/camera.service"
import { usePhoto } from "../../hooks/usePhoto"
import { useState } from "react"

interface Invoice {
  numero: string
  fecha: string
  proveedor: string
  cuit: string
  total: number
  iva21: number
  iva105: number
  ingresosBrutos: number
}

interface UploadedPhoto {
  file: File
  preview: string
  response: Invoice
}

// 🔥 Normalizador del backend
const normalizeInvoice = (data: any): Invoice => ({
  numero: data.numero_factura,
  fecha: data.fecha,
  proveedor: data["razon social"],
  cuit: data.CUIT,
  total: data.TOTAL,
  iva21: data["IVA 21%"] || 0,
  iva105: data["IVA 10,5%"] || 0,
  ingresosBrutos: data["PERC. IB CABA"] || 0
})

export function CameraPage() {
  const { upload, loading } = usePhoto()
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])

  const handleFileUpload = async (file: File) => {
    const preview = URL.createObjectURL(file)

    try {
      const response = await upload(file)

      //Normalizar respuesta
      const normalized = normalizeInvoice(response)

      setUploadedPhotos(prev => [
        ...prev,
        { file, preview, response: normalized }
      ])
    } catch (err) {
      console.error("Error uploading photo:", err)
    }
  }

  const handleTakePhoto = async () => {
    const photo = await takePhoto()
    const response = await fetch(photo.webPath!)
    const blob = await response.blob()
    const file = new File([blob], "photo.jpg", { type: blob.type })

    await handleFileUpload(file)
  }

  const handleGallery = async () => {
    const photo = await selectFromGallery()
    const response = await fetch(photo.webPath!)
    const blob = await response.blob()
    const file = new File([blob], "gallery.jpg", { type: blob.type })

    await handleFileUpload(file)
  }

  return (
    <div className="camera-page">

      <div className="camera-card">
        <h1 className="camera-title">Escanear Factura</h1>
        <p className="camera-subtitle">
          Toma una foto o selecciona desde tu galería
        </p>

        <div className="camera-actions">
          <button className="camera-btn primary" onClick={handleTakePhoto} disabled={loading}>
            📸 Tomar foto
          </button>
          <button className="camera-btn secondary" onClick={handleGallery} disabled={loading}>
            🖼 Galería
          </button>
        </div>

        {loading && <div className="loader"></div>}
      </div>

      {/* LISTA */}
      <div className="uploaded-photos">
        {uploadedPhotos.map((item, index) => (
          <div key={index} className="invoice-card">

            {/* HEADER */}
            <div className="invoice-header">
              <div>
                <h3>#{item.response.numero}</h3>
                <span>{item.response.fecha}</span>
              </div>
              <strong className="invoice-total">
                ${item.response.total.toLocaleString()}
              </strong>
            </div>

            {/* BODY */}
            <div className="invoice-body">
              <p className="provider">{item.response.proveedor}</p>
              <p className="cuit">CUIT: {item.response.cuit}</p>
            </div>

            {/* IMPUESTOS */}
            <div className="invoice-tax">
              <div>
                <span>IVA 21%</span>
                <strong>${item.response.iva21}</strong>
              </div>
              <div>
                <span>IVA 10.5%</span>
                <strong>${item.response.iva105}</strong>
              </div>
              <div>
                <span>IIBB</span>
                <strong>${item.response.ingresosBrutos}</strong>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}