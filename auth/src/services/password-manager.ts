import bcrypt from "bcrypt";

export class PasswordManager {
  static async toHash(password: string) {
    return bcrypt.hash(password, 8);
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return bcrypt.compare(suppliedPassword, storedPassword);
  }
}