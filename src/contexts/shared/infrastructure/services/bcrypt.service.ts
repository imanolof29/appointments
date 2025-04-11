import { Injectable } from "@nestjs/common";
import { EncryptService } from "../../domain/services/encrypt.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService extends EncryptService {
    async encrypt(value: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(value, salt);
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }
}