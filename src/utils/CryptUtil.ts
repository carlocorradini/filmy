import bcrypt from 'bcryptjs';

export default class CryptUtil {
  private static readonly SALT_ROUNDS: number = 10;

  public static async hash(s: string): Promise<string> {
    const salt = await bcrypt.genSalt(CryptUtil.SALT_ROUNDS);
    const hash = await bcrypt.hash(s, salt);
    return new Promise((resolve) => resolve(hash));
  }

  public static async compare(s: string, hash: string): Promise<boolean> {
    const equals = await bcrypt.compare(s, hash);
    return new Promise((resolve) => resolve(equals));
  }

  public static async getRounds(hash: string): Promise<number> {
    const rounds = await bcrypt.getRounds(hash);
    return new Promise((resolve) => resolve(rounds));
  }

  public static async getSalt(hash: string): Promise<string> {
    const salt = await bcrypt.getSalt(hash);
    return new Promise((resolve) => resolve(salt));
  }
}
