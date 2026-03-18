import "./CameraPage.css"
import { takePhoto, selectFromGallery } from "../../infrastructure/camera.service"
import { usePhoto } from "../../hooks/usePhoto"
import { useState } from "react"

interface UploadedPhoto {
  file: File
  preview: string
  response: any
}

export function CameraPage() {
  const { upload, loading } = usePhoto()
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])

  const handleFileUpload = async (file: File) => {
    // Generar preview local
    const preview = URL.createObjectURL(file)

    try {
      const response = await upload(file)

      // Guardar en la lista
      setUploadedPhotos(prev => [
        ...prev,
        { file, preview, response }
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

        <h1 className="camera-title">Take a Photo</h1>
        <p className="camera-subtitle">Capture a new image or select one from your gallery</p>

        <div className="camera-actions">
          <button className="camera-btn primary" onClick={handleTakePhoto} disabled={loading}>
            📸 Take Photo
          </button>
          <button className="camera-btn secondary" onClick={handleGallery} disabled={loading}>
            🖼 Choose From Gallery
          </button>
        </div>

        {loading && <p>Uploading photo...</p>}

      </div>

      <div className="uploaded-photos">
        {uploadedPhotos.map((item, index) => (
          <div key={index} className="photo-response-card">
            <h3>Factura: {item.response.numero_factura}</h3>
            <ul>
              <li><strong>Fecha:</strong> {item.response.fecha}</li>
              <li><strong>Proveedor:</strong> {item.response.proveedor}</li>
              <li><strong>Total:</strong> €{item.response.total.toFixed(2)}</li>
              <li><strong>Impuestos:</strong> €{item.response.impuestos.toFixed(2)}</li>
            </ul>
          </div>
        ))}
      </div>

    </div>
  )
}