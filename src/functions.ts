// functions.ts

import axios, {AxiosResponse} from 'axios';
import {AgentData} from "./types";

export const sendRequest = async (method: string, route: string, data?: any): Promise<any> => {
    let response: AxiosResponse;
//    let baseRoute = "http://localhost:8000/";
    let baseRoute = "http://vibrant-darwin.37-60-246-29.plesk.page:8000/";
    const trueRoute = baseRoute + route;
    axios.defaults.withCredentials = true
    try {
        let headers: any = {}; // Initialisez un objet pour contenir les en-têtes de la requête

        // Récupérez le cookie de votre stockage local ou de vos cookies, où vous l'avez stocké
        const jwtToken = localStorage.getItem('jwt'); // Par exemple, s'il est stocké localement dans le navigateur

        if (jwtToken) {
            headers.Authorization = `Bearer ${jwtToken}`; // Ajoutez le cookie JWT à l'en-tête Authorization
        }

        switch (method.toLowerCase()) {
            case 'get':
                response = await axios.get(trueRoute, {headers});
                break;
            case 'post':
                response = await axios.post(trueRoute, data, {headers});
                break;
            case 'put':
                response = await axios.put(trueRoute, data, {headers});
                break;
            case 'delete':
                response = await axios.delete(trueRoute, {headers});
                break;
            case 'patch':
                response = await axios.patch(trueRoute, data, {headers});
                break;
            default:
                throw new Error('Invalid HTTP method');
        }

        return response.data;
    } catch (error) {
        console.error(`Error ${method.toUpperCase()}ing data:`, error);
        throw error;
    }
};


export function generateListeAvailableMatricule(existingMatricules: number[]): number[] | null {
    const maxMatricule = 99;
    const availableMatricules = Array.from({length: maxMatricule}, (_, i) => i + 1)
        .reduce((acc, matricule) => {
            if (!existingMatricules.includes(matricule)) {
                acc.push(matricule);
            }
            return acc;
        }, [] as number[]);

    return availableMatricules;
}

export const applyTaxeSalary = (taux: number, salary: number) => {

    return (taux * salary) + salary

}

export const companyId = (company: string) => {
    if (company === "LSPD") return "621708442297434130"
    else if (company === "BCSO") return "1147211942663032942"
    else return "no valid id"
}

export const checkInCity = (playersConnected: AgentData[], discordId: string) => {

    for (const player of playersConnected) {

        if (player.discordId === discordId) {
            return true
        }
    }
    return false
}