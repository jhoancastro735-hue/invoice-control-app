import { PhotoRepository } from "../domain/interfaces/PhotoRepository"
import { Photo } from "../domain/entities/Photo"
import axios from "axios"

export class PhotoRepositoryImpl implements PhotoRepository {

  async uploadPhoto(photo: Photo) {

    const formData = new FormData()
    formData.append("data", photo.file)

    // Aquí pones tu webhook de n8n
    const WEBHOOK_URL = "https://thepodmaker.app.n8n.cloud/webhook/upload" 

    const response = await axios.post(WEBHOOK_URL, formData, {
      headers: {
        // IMPORTANTE: No pongas application/json, deja que axios genere multipart/form-data
        "Content-Type": "multipart/form-data"
      }
    })

    return response.data
  }
}