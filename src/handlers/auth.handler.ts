
const login = async (req: any, res: any) => {
    return {
        id: "id",
        email: "email"
    };
};

const signup = async (req: any, res: any) => {
    return {
        id: "id",
        email: "email"
    };
};

const logout = async (req: any, res: any) => {
    res.clearCookie('token');
    return null;
};

export const authHandler = {
    login,
    signup,
    logout
};