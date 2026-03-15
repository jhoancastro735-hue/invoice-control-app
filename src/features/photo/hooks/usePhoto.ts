import { useState } from "react"
import { UploadPhoto } from "../domain/usecases/UploadPhoto"
import { PhotoRepositoryImpl } from "../infrastructure/photo.repository.impl"

export const usePhoto = () => {

  const [loading, setLoading] = useState(false)

  const repository = new PhotoRepositoryImpl()
  const uploadUseCase = new UploadPhoto(repository)

  const upload = async (file: File) => {

    setLoading(true)

    try {

      const result = await uploadUseCase.execute({
        file
      })

      return result

    } finally {

      setLoading(false)

    }

  }

  return {
    upload,
    loading
  }

}