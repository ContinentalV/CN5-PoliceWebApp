import React, {useCallback, useEffect, useState} from 'react';
import {PoliceDetailProps} from "../../types";
import {applyCurrencyFormat, convertirMinutesEnHeureMinutes} from "../../utils/functions";
import dayjs from "dayjs";
import UpdateAgentForm from "../UpdateTimeAgentForm";
import MatriculeComponent from "../MatriculeComponent";
import {applyTaxeSalary, checkInCity, companyId, generateListeAvailableMatricule, sendRequest} from "../../functions";
import ProgressBarQuota from "../ProgressBarQuota";
import AgentGradesComponents from "../AgentGradesComponents";

interface BaseSalarial {
    idRole: string;
    name: string;
    salary: number;
}


const PoliceProfileInformation: React.FC<PoliceDetailProps> = ({agent, company, online}) => {
    const [activeButton, setActiveButton] = useState("");
    const [matriculeArray, setMatriculeArray] = useState<number[] | null>(null)
    const [onlinePlayer, setOnlinePlayer] = useState(false)
    const [baseSalaryAgent, setBaseSalaryAgent] = useState<BaseSalarial>({
        idRole: "",
        name: "",
        salary: 0
    });
    const companyID = companyId(company)


    const getBaseSalarial = async () => {
        const [baseSalarial] = await Promise.all([

            sendRequest("get", `stats/stats/base-salarial/${company}`)
        ])

        const allGradeBaseSalarial = baseSalarial.data
        allGradeBaseSalarial.forEach((grade: BaseSalarial) => {
            if (agent.roleId.split(',').includes(grade.idRole)) {
                setBaseSalaryAgent({
                    idRole: grade.idRole,
                    name: grade.name,
                    salary: grade.salary
                })

            }
        })


    }
    useEffect(() => {
        getBaseSalarial()
    }, []);

    useEffect(() => {
        dataApiFetch()
    }, []);

    useEffect(() => {
        if (online) {

            const isCity = checkInCity(online, agent.discordId);
            if (isCity) {
                setOnlinePlayer(true);
            } else {
                setOnlinePlayer(false);
            }
        }
    }, [online]);

    const dataApiFetch = async () => {

        const [Matricule,] = await Promise.all([
            sendRequest("get", "stats/stats/matricules"),
        ]);


        if (company === "LSPD") {
            const matLSPD = Matricule.LSPD.filter((mat: number) => mat !== 0 && mat !== null)
            const matriculeArray = generateListeAvailableMatricule(matLSPD)
            setMatriculeArray(matriculeArray)
        } else if (company === "BCSO") {
            const matBCSO = Matricule.BCSO.filter((mat: number) => mat !== 0 && mat !== null)
            const matriculeArray = generateListeAvailableMatricule(matBCSO)
            setMatriculeArray(matriculeArray)
        }


    }

    const handleButtonClick = useCallback((btnName: string) => {
        setActiveButton(prevActiveButton => prevActiveButton === btnName ? "" : btnName);
    }, []);

    return (
        <div className="agent-container">
            <div className="agent-avatar-block">
                <div className="leftside">
                    <div className="nameAvatar">
                        <img src={agent.avatar} alt={`${agent.nomRP}'s avatar`} className="avatar"/>
                        <h1 className="name">{agent.nomRP}</h1>
                    </div>

                    <div className="state">
                        <div className={`detail state-agent ${agent.inService ? "active-agent" : "inactive-agent"}`}>
                            <i className={`bi bi-controller ${agent.inService ? "active-agent" : "inactive-agent"}`}></i>
                            <p className={`${agent.inService ? "active-agent" : "inactive-agent"}`}>{agent.inService ? "SERVICE ON" : "SERVICE OFF"}</p>
                        </div>
                        <div className={`detail state-agent ${onlinePlayer ? "active-agent" : "inactive-agent"}`}>
                            <i className={`bi bi-controller ${onlinePlayer ? "active-agent" : "inactive-agent"}`}></i>
                            <p className={`${onlinePlayer ? "active-agent" : "inactive-agent"}`}>{onlinePlayer ? "ONLINE" : "OFFLINE"}</p>
                        </div>
                    </div>

                </div>


            </div>

            <div className="agent-hours-block">
                <div className="detail date-join">
                    <span className="label">Membre de la {company} depuis:</span>
                    <span className={`value `}>{dayjs(agent.dateJoin).format("DD-MM-YYYY | HH:mm")}</span>
                </div>
                <div className="detail total-connection-time">
                    <span className="label">Temps de Service Total:</span>
                    <span className="value info"> {convertirMinutesEnHeureMinutes(agent.tempsTotalService)}   </span>
                </div>
                <div className="detail total-salaire-estimer">
                    <span className="label">Salaire (HT, ce que doit recevoir l'agent):</span>
                    <span className="value info"> {applyCurrencyFormat(agent.salary)}   </span>
                </div>

                <div className="detail total-salaire-estimer">
                    <span className="label">Salaire(TTC, ce qu'il faut retirer du coffre):</span>
                    <span className="value info"> {applyCurrencyFormat(applyTaxeSalary(0.20, agent.salary))}</span>
                </div>

            </div>

            <div className="agent-progress-block">
                <div className="detail percentage-fill-quota">
                    <span className="label">Pourcentage du Quota Remplis</span>
                    <ProgressBarQuota value={agent.tempsTotalService} maxValue={690}/>

                </div>

            </div>

            <div className="agent-data-diverse-block">
                <div className="grade-salaire">
                    <p>Grade Salarial: </p>
                    <span className="grade">{baseSalaryAgent.name}</span>
                </div>

                <div className="base-salarial">
                    <p>Base Salarial:</p>
                    <span className="salaire"> {applyCurrencyFormat(baseSalaryAgent.salary)}</span>

                </div>

            </div>
            <div className="agent-actions-bar">
                <div className={`btn-time btn-action-agent ${activeButton === "btn-time" ? 'active-btn' : ''}`}
                     onClick={() => handleButtonClick("btn-time")}>
                    <i className="bi bi-clock-history"></i>
                </div>
                <div onClick={() => handleButtonClick("btn-matricule")}
                     className={`btn-matricule btn-action-agent ${activeButton === "btn-matricule" ? 'active-btn' : ''}`}>
                    <i className="bi bi-list-ol"></i>
                </div>
                <div onClick={() => handleButtonClick("btn-grades")}
                     className={`btn-grades btn-action-agent ${activeButton === "btn-grades" ? 'active-btn' : ''}`}>
                    <i className="bi bi-exclamation-square"></i></div>
                <div className="btn-action-agent"><i className="bi bi-journal-bookmark-fill"></i></div>

            </div>
            <div className="agent-output-form">
                {activeButton === "btn-time" ? (
                    <UpdateAgentForm companyId={companyID} discordId={agent.discordId}/>
                ) : activeButton === "btn-matricule" ? (
                    <MatriculeComponent discordId={agent.discordId} matricule={matriculeArray!} nickname={agent.nomRP}
                                        company={companyID}/>
                ) : activeButton === "btn-grades" ? (
                    <AgentGradesComponents company={companyID} agentId={agent.discordId} gradeId={agent.roleId}
                                           gradeName={agent.roleName}
                                           color={agent.roleColor}/>
                ) : (
                    <img
                        src={company === "LSPD" ? "https://cdn.discordapp.com/icons/621708442297434130/d69f1a64bc00360f0d563dba08d5cb9e.png?size=1024" : "https://cdn.discordapp.com/icons/1147211942663032942/24c5f2955ee923ab559d68cbf482f231.png?size=1024"}
                        width={130} height={130} alt="Placeholder"/>
                )}
            </div>

        </div>
    );
};

export default PoliceProfileInformation;
