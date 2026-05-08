import { users } from "@/data/users";

export const login = async (email, password) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const user = users.find(
                (u) =>
                    u.email === email &&
                    u.password === password
            );

            if (!user) {
                reject(new Error("Invalid email or password"));
                return;
            }

            const fakeToken = "fake-jwt-token";

            localStorage.setItem("token", fakeToken);
            localStorage.setItem("role", user.role);
            localStorage.setItem("user", JSON.stringify(user));

            resolve({
                token: fakeToken,
                user,
            });

        }, 1000);

    });
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    if (typeof window === "undefined") return null;

    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;

    return !!localStorage.getItem("token");
};                  