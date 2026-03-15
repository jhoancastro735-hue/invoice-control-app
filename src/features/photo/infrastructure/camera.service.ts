import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"

export const takePhoto = async () => {

  return Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera
  })

}

export const selectFromGallery = async () => {

  return Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Uri,
    source: CameraSource.Photos
  })

}