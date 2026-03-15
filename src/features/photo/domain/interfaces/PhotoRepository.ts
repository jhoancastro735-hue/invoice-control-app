import { Photo } from "../entities/Photo"
import { UploadPhotoResponse } from "../../../../core/types/global.types"

export interface PhotoRepository {
  uploadPhoto(photo: Photo): Promise<UploadPhotoResponse>
}