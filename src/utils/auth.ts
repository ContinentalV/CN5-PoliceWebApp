// auth.ts

// Fonction pour récupérer le jeton d'accès du cookie ou du stockage local
export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

// Fonction pour définir le jeton d'accès dans le cookie ou le stockage local
export const setAccessToken = (accessToken: string): void => {
    localStorage.setItem('accessToken', accessToken);
};

// Fonction pour effacer le jeton d'accès du cookie ou du stockage local
export const clearAccessToken = (): void => {
    localStorage.removeItem('accessToken');
};
