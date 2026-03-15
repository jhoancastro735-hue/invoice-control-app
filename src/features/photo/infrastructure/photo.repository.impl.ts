import { PhotoRepository } from "../domain/interfaces/PhotoRepository"
import { Photo } from "../domain/entities/Photo"
import { apiClient } from "../../../core/api/apiClient"

export class PhotoRepositoryImpl implements PhotoRepository {

  async uploadPhoto(photo: Photo) {

    const formData = new FormData()
    formData.append("file", photo.file)

    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    return response.data
  }
}