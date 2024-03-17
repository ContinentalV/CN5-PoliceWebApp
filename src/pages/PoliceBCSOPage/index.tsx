import React, {useEffect, useState} from 'react';
import BadgeGeneralPageLspd from "../../components/BadgeGeneralPagePolice";
import {sendRequest} from "../../functions";
import {AgentData} from "../../types";
import PoliceLeaderBoardTable from "../../components/PoliceLeaderBoardTable";
import PoliceProfileInformation from "../../components/PoliceProfileInformation";
import {filterChoice, findConnectedAgents} from "../../utils/functions";

const PoliceBCSOPage = () => {
    const [dataBCSO, setDataLspd] = useState<AgentData[]>([]);
    const [countService, setCountService] = useState<number>(0);
    const [agentInCity, setAgentInCity] = useState(0);
    const [totalSalaryCost, setTotalSalaryCost] = useState(0);
    const [totalSalaryCostWithTaxe, setTotalSalaryCostWithTaxe] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [selectedPolice, setSelectedPolice] = useState<AgentData | null>(null);
    const [resetKey, setResetKey] = useState(0); // clé aléatoire pour forcer la réinitialisation
    const [allOnline, setAllOnline] = useState<AgentData[]>([])

    const company = 'BCSO'
    useEffect(() => {
        fetchDataFromApi();
        const interval = setInterval(fetchDataFromApi, 15 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Réinitialiser la clé aléatoire lorsque selectedPolice change
        setResetKey(prevKey => prevKey + 1);
    }, [selectedPolice]);

    const fetchDataFromApi = async () => {
        try {
            const [bcsoResponse, bcsoServiceResponse, jsonConti] = await Promise.all([
                sendRequest('get', `profile/p/leaderboards?codeMetier=BCSO`),
                sendRequest('get', 'stats/stats/service?codeMetier=BCSO'),
                sendRequest('get', 'stats/stats/json/conti')


            ]);
            const allPlayers = jsonConti.Data.players
            const connectedAgentsBcso: AgentData[] = findConnectedAgents(bcsoServiceResponse.filter(filterChoice.filterExcludeNotAnAgent), allPlayers);
            const dataCount = bcsoServiceResponse.filter((a: AgentData) => a.inService === 1);
            if (connectedAgentsBcso.length > 0) {
                setAllOnline(connectedAgentsBcso)
            }

            // Calcul du coût total des salaires
            let totalSalary = 0;
            let totalSalaryWithTaxe = 0
            bcsoResponse.dataAll.forEach((agent: AgentData) => {
                if (agent.matricule !== 0 && agent.matricule !== null) {
                    totalSalary += agent.salary;
                    totalSalaryWithTaxe = totalSalary + (totalSalary * 0.20)
                }
            });


            let totalHoursWork = 0
            bcsoResponse.dataAll.forEach((agent: AgentData) => {
                if (agent.matricule !== 0 && agent.matricule !== null) {
                    totalHoursWork += agent.tempsTotalService
                }
            });
            setTotalSalaryCostWithTaxe(totalSalaryWithTaxe)
            setAgentInCity(connectedAgentsBcso.length)
            setTotalHours(totalHoursWork);
            setCountService(dataCount.length);
            setDataLspd(bcsoResponse.dataAll.filter((agent: AgentData) => agent.matricule !== 0 && agent.matricule !== null));
            setTotalSalaryCost(totalSalary); // Met à jour le coût total des salaires
        } catch (error) {
            console.log(error);
        }
    };

    const handlePoliceSelect = (policeId: string) => {
        const police = dataBCSO.find((police: AgentData) => police.discordId === policeId);
        setSelectedPolice(police || null);
    };

    return (
        <div className="police-container">
            <BadgeGeneralPageLspd onService={countService} onCity={agentInCity} totalHours={totalHours}
                                  totalSalaryCost={totalSalaryCost} TotalSalaryCostWithTaxe={totalSalaryCostWithTaxe}/>

            <div className="police-content-container">
                <div className="leaderboard custom-class">

                    <PoliceLeaderBoardTable data={dataBCSO} handlePoliceSelect={handlePoliceSelect}/>
                </div>
                <div className="agent-data-container">
                    {selectedPolice &&
                        <PoliceProfileInformation online={allOnline} key={resetKey} agent={selectedPolice}
                                                  company={company}/>}
                </div>
            </div>
        </div>
    );
};

export default PoliceBCSOPage;
