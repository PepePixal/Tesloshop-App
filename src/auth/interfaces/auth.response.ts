
import type { User } from "@/interfaces/user.interface";

// sirve para el Login, Register u CheckStatus
export interface AuthResponse {
    user: User;
    token: string;
}
