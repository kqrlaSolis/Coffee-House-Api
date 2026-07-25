import { AuthRepository } from "./auth.repository";
import { comparePassword, generateJWT } from "../../core/utils/security";

export const login = async (userName: string, password: string) => {
    const user = await AuthRepository.findByUserName(userName);

    if (!user || !user.isActive) {
        return null;
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
        return null;
    }

    const token = await generateJWT({
        id: user.id,
        userName: user.userName,
        role: user.role,
    });

    return {
        token,
        user: {
            id: user.id,
            userName: user.userName,
            role: user.role,
        },
    };
};
