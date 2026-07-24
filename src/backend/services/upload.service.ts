import { StorageRepository } from "../repositories/upload.repository";

export class UploadService {
    private storageRepository =
        new StorageRepository();

    async uploadImage(file: File) {
        return this.storageRepository.uploadImage(file);
    }
}