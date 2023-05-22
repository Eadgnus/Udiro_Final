export default class AuthService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async signup(user_name, user_id, user_pw, user_email, user_email, user_phone, user_area, url) {
        const data = await this.http.fetch('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                user_name,
                user_id,
                user_pw,
                user_email,
                user_phone,
                user_area,
            }),
        });
        this.tokenStorage.saveToken(data.token);
        return data;
    }

    async login(username, password) {
        const data = await this.http.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        this.tokenStorage.saveToken(data.token);
        return data;
    }

    async me() {
        const token = this.tokenStorage.getToken();
        return this.http.fetch('/auth/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async logout() {
        this.tokenStorage.clearToken();
    }
}
