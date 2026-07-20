export interface LoginDTO {
    userName: string;
    password: string;
}

export interface AuthResponseDTO {
    token: string;
    user: {
        id: number;
        userName: string;
        role: string;
    };
}
