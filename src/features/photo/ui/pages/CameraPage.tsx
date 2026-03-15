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

    <div>

      <button onClick={handleTakePhoto}>
        Take Photo
      </button>

      <button onClick={handleGallery}>
        Choose From Gallery
      </button>

    </div>

  )

}