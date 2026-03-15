import React from "react";
import { takePhoto, pickFromGallery } from "../../infrastructure/camera.service"
import { usePhoto } from "../../hooks/usePhoto"

export const CameraButtons = () => {

  const { upload } = usePhoto()

  const handleTakePhoto = async () => {
    const photo = await takePhoto()

    const response = await fetch(photo.webPath!)
    const blob = await response.blob()

    const file = new File([blob], "photo.jpg", { type: blob.type })

    await upload(file)
  }

  const handleGallery = async () => {
    const photo = await pickFromGallery()

    const response = await fetch(photo.webPath!)
    const blob = await response.blob()

    const file = new File([blob], "gallery.jpg", { type: blob.type })

    await upload(file)
  }

  return (
    <div>
      <button onClick={handleTakePhoto}>
        Tomar Foto
      </button>

      <button onClick={handleGallery}>
        Elegir de Galería
      </button>
    </div>
  )
}