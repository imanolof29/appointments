export abstract class EncryptService {
    abstract encrypt(value: string): Promise<string>;
    abstract compare(value: string, hash: string): Promise<boolean>;
}