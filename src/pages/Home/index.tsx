import React, {useEffect, useState} from 'react';
import BadgeGeneralPageHomePolice from "../../components/BadgeGeneralPageHomePolice";
import {sendRequest} from "../../functions";
import {AgentData} from "../../types";
import PoliceServiceTable from "../../components/PoliceServiceTable";
import {filterChoice, findConnectedAgents} from "../../utils/functions";

const Home = () => {


    const [lspdDataLength, setLspdDataLength] = useState<number>(0);
    const [bcsoDataLength, setBcsoDataLength] = useState<number>(0);
    const [dataFullLspd, setDataFullLspd] = useState<AgentData[]>([]);
    const [dataFullBcso, setDataFullBcso] = useState<AgentData[]>([]);
    const [citoyenCount, setCitoyenCount] = useState<number>(0)
    const [totalAgentInCity, setTotalAgentInCity] = useState<number>(0)
    const [allAgentLspdNumber, setAllAgentLspdNumber] = useState<number>(0)
    const [allAgentBcsoNumber, setAllAgentBcsoNumber] = useState<number>(0)
    const [selectedPolice, setSelectedPolice] = useState<AgentData | null>(null);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const [lspdResponse, bcsoResponse, jsonConti] = await Promise.all([
                sendRequest('get', 'stats/stats/service?codeMetier=LSPD'),
                sendRequest('get', 'stats/stats/service?codeMetier=BCSO'),
                sendRequest('get', 'stats/stats/json/conti')
            ]);

            const lspdOnService = lspdResponse.filter(filterChoice.inDuty);
            const bcsoOnService = bcsoResponse.filter(filterChoice.inDuty);
            const nbplayers = jsonConti.Data.clients
            const allPlayers = jsonConti.Data.players;
            const connectedAgentsLspd: AgentData[] = findConnectedAgents(lspdResponse.filter(filterChoice.filterExcludeNotAnAgent), allPlayers);
            const connectedAgentBcso: AgentData[] = findConnectedAgents(bcsoResponse.filter(filterChoice.filterExcludeNotAnAgent), allPlayers);
            const totalAgentInCity: number = connectedAgentsLspd.length + connectedAgentBcso.length


            setLspdDataLength(lspdOnService.length);
            setAllAgentLspdNumber(lspdResponse.length)
            setBcsoDataLength(bcsoOnService.length);
            setAllAgentBcsoNumber(bcsoResponse.length)
            setCitoyenCount(nbplayers);
            setTotalAgentInCity(totalAgentInCity)
            setDataFullLspd(lspdOnService.filter(filterChoice.filterExcludeNotAnAgent));
            setDataFullBcso(bcsoOnService.filter(filterChoice.filterExcludeNotAnAgent));
        } catch (error) {
            console.log(error);
        }
    };

    const handlePoliceSelect = (policeId: string, dataFull: AgentData[]) => {
        const police = dataFull.find((police: AgentData) => police.discordId === policeId);
        setSelectedPolice(police || null);


    };

    return (
        <div className="HomeContainer">
            <BadgeGeneralPageHomePolice
                LspdOnService={lspdDataLength}
                TotalLspd={allAgentLspdNumber}
                TotalBcso={allAgentBcsoNumber}
                BcsoOnService={bcsoDataLength}
                PoliceInTown={totalAgentInCity}
                players={citoyenCount}
            />
            <div className="polices-monitor">
                <div className="home-content lspd-monitor">
                    <div className="title-home-content">
                        <img
                            src="https://cdn.discordapp.com/icons/621708442297434130/d69f1a64bc00360f0d563dba08d5cb9e.png?size=1024"
                            width={50} height={50} alt="LSPD"/>
                        <h1 className="title"> L.S.P.D.</h1>
                    </div>
                    <h3 className="subtile"> Liste des Agents en service: </h3>
                    <div className="agent-content-table">
                        <PoliceServiceTable data={dataFullLspd}
                                            handlePoliceSelect={(policeId: string) => handlePoliceSelect(policeId, dataFullLspd)}/>
                    </div>
                </div>
                <div className="home-content bcso-monitor">
                    <div className="title-home-content">
                        <img
                            src="https://cdn.discordapp.com/icons/1147211942663032942/24c5f2955ee923ab559d68cbf482f231.png?size=1024"
                            width={50} height={50} alt="BCSO"/>
                        <h1 className="title"> B.C.S.O.</h1>
                    </div>
                    <h3 className="subtile"> Liste des Agents en service: </h3>
                    <div className="agent-content-table">
                        <PoliceServiceTable data={dataFullBcso}
                                            handlePoliceSelect={(policeId: string) => handlePoliceSelect(policeId, dataFullBcso)}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
