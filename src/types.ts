export interface AgentData {
    discordId: string;
    username: string;
    nomRP: string;
    avatar: string;
    codeMetier: string;
    dateJoin: string;
    matricule: number;
    dernierPDS: number | null;
    inService: number;
    tempsTotalService: number;
    salary: number;
    serviceTime: number;
    roleId: string;
    roleName: string;
    roleColor: string

}


export interface ServiceTime {
    id?: string;
    pds: number;
    fds: number;
    workingTime: number;
    productivityScore: string;
}

export interface HistoryAnalysed {
    id?: string;
    pds: number;
    fds: number;
    workingTime: number;
    score: number;
}

export interface HistoriqueConnexion {
    id?: string;
    start: number;
    end: number;
    hebdomadaire: number;
}

export interface DailyNote {
    pds: string | number;
    fds: string | number;
    workingTime: number;
    score: number;
    coef?: number;
}


export interface Column {
    id: keyof AgentData;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left' | 'inherit' | 'justify';
    format?: (value: any) => JSX.Element | string;
}

interface PdsHistoryTableProps {
    data: HistoryAnalysed[];
}

export interface PoliceDetailProps {
    agent: AgentData;
    company: string;
    online?: AgentData[]

}

export interface PlayerJSON {
    endpoint: string;
    id: number;
    identifiers: string[];
    name: string;
    ping: number;
}
