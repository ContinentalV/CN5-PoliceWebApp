import {AgentData} from "../types";

export function convertirMinutesEnHeureMinutes(minutes: number): string {
    const heures = Math.floor(minutes / 60);
    const minutesRestantes = minutes % 60;

    if (heures > 0) {
        return `${heures} Heure(s) ${minutesRestantes} min`;
    } else {
        return `${minutes}min`;
    }
}

export const filterChoice = {
    filterExcludeNotAnAgent: (agent: AgentData) => agent.matricule !== null && agent.matricule !== 0,
    inDuty: (agent: AgentData) => agent.inService === 1,


};

export const findConnectedAgents = (police: AgentData[], allPlayers: any) => {
    // Filtrer les agents de lspdResponse qui sont présents dans allPlayers
    const connectedAgents = police.filter((agent: AgentData) => {
        const discordId = agent.discordId;
        // Vérifier si l'identifiant Discord de l'agent est présent dans allPlayers
        return allPlayers.some((player: any) => player.identifiers.includes(`discord:${discordId}`));
    });

    // Afficher les informations des agents connectés dans la console
    connectedAgents.forEach((agent: AgentData) => {
        const discordId = agent.discordId;
        const playerInfo = allPlayers.find((player: any) => player.identifiers.includes(`discord:${discordId}`));
        // console.log("Agent trouvé dans allPlayers :", playerInfo);
    });

    return connectedAgents;
};

export const applyCurrencyFormat = (money: number) => {
    return money.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
}

export function processRoles(roleId: string, roleName: string, roleColor: string) {
    // Convertir les chaînes de caractères en tableaux
    const roleIdArray = roleId.split(',');
    const roleNameArray = roleName.split(',');
    const roleColorArray = roleColor.split(',');

    // Initialiser le tableau des rôles
    const roles = [];

    // Parcourir les tableaux et créer les objets de rôle
    for (let i = 0; i < roleIdArray.length; i++) {
        // Exclure le rôle "@everyone"
        if (roleNameArray[i] !== "@everyone") {
            // Créer un objet pour chaque rôle
            const role = {
                roleId: roleIdArray[i].trim(),
                roleName: roleNameArray[i].trim(),
                roleColor: roleColorArray[i].trim()
            };
            // Ajouter l'objet de rôle au tableau des rôles
            roles.push(role);
        }
    }

    // Retourner le tableau des rôles
    return roles;
}

