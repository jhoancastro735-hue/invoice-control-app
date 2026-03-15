import { PhotoRepository } from "../interfaces/PhotoRepository"
import { Photo } from "../entities/Photo"

export class UploadPhoto {

  constructor(private repository: PhotoRepository) {}

  async execute(photo: Photo) {
    if (!photo.file) {
      throw new Error("Photo file is required")
    }

    return this.repository.uploadPhoto(photo)
  }
}