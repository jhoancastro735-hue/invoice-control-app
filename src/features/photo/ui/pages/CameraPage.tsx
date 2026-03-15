import "./CameraPage.css"
import { takePhoto, selectFromGallery } from "../../infrastructure/camera.service"
import { usePhoto } from "../../hooks/usePhoto"

export function CameraPage() {

  const { upload } = usePhoto()

  const handleTakePhoto = async () => {

    const photo = await takePhoto()

    const response = await fetch(photo.webPath!)
    const blob = await response.blob()

    const file = new File([blob], "photo.jpg", {
      type: blob.type
    })

    await upload(file)

  }

  const handleGallery = async () => {

    const photo = await selectFromGallery()

    const response = await fetch(photo.webPath!)
    const blob = await response.blob()

    const file = new File([blob], "gallery.jpg", {
      type: blob.type
    })

    await upload(file)

  }

  return (

    <div className="camera-page">

      <div className="camera-card">

        <h1 className="camera-title">
          Take a Photo
        </h1>

        <p className="camera-subtitle">
          Capture a new image or select one from your gallery
        </p>

        <div className="camera-actions">

          <button
            className="camera-btn primary"
            onClick={handleTakePhoto}
          >
            📸 Take Photo
          </button>

          <button
            className="camera-btn secondary"
            onClick={handleGallery}
          >
            🖼 Choose From Gallery
          </button>

        </div>

      </div>

    </div>

  )

}