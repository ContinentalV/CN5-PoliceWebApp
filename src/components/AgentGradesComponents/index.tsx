import React, {useEffect, useState} from "react";

import ShowGrade from "../ShowGrade";
import {sendRequest} from "../../functions";
import {processRoles} from "../../utils/functions";

interface PropsGrade {
    gradeName: string;
    gradeId: string;
    color: string;
    agentId?: string;
    onGradeRemoved?: (gradeId: string) => void;
    onGradeAdded?: (gradeId: string) => void;
    company: string;
}

const AgentGradesComponents: React.FC<PropsGrade> = ({gradeId, gradeName, color, agentId, company}) => {
    const [grades, setGrades] = useState(processRoles(gradeId, gradeName, color));
    const [listGrade, setListGrade] = useState(processRoles(gradeId, gradeName, color));

    useEffect(() => {
        fetchAllGrade();
       
    }, []);

    const fetchAllGrade = async () => {
        const allGrades = await sendRequest('get', `stats/stats/grade/all/${company}`);
        const filteredGrades = allGrades.grades.filter((grade: any) => {
            return !grades.some((agentGrade: any) => agentGrade.roleId === grade.roleId) &&
                !listGrade.some((listGradeItem: any) => listGradeItem.roleId === grade.roleId) &&
                grade.name !== "-----------------------" &&
                grade.name !== "@everyone";
        });
        setListGrade(filteredGrades);
    }

    const handleGradeRemoved = (roleIdToRemove: string) => {
        setGrades(prevGrades => prevGrades.filter(grade => grade.roleId !== roleIdToRemove));
        const removedGrade = grades.find(grade => grade.roleId === roleIdToRemove);
        console.log("suuppression grade d'un agent ")
        console.log(removedGrade)
        if (removedGrade) {
            setListGrade(prevListGrade => [...prevListGrade, removedGrade]);
        }
    }

    const handleGradeAdded = (roleIdToAdd: string) => {
        const addedGrade = listGrade.find(grade => grade.roleId === roleIdToAdd);
        console.log("Ajout d'un grade a un agent  ")
        console.log(addedGrade)
        if (addedGrade) {
            setGrades(prevGrades => [...prevGrades, addedGrade]);
        }
        setListGrade(prevListGrade => prevListGrade.filter(grade => grade.roleId !== roleIdToAdd));
    }

    return (
        <div className="grades-container">
            <div className="agent-grades">
                {grades.map((role: any, index: any) => (
                    <ShowGrade
                        key={index}
                        agentId={agentId}
                        gradeName={role.roleName || role.name}
                        gradeId={role.roleId}
                        color={role.roleColor || role.color}
                        onGradeRemoved={handleGradeRemoved}
                        company={company}
                    />
                ))}
            </div>
            <div className="all-grades">
                <div className="liste-all-role">
                    {listGrade.map((grade: any, index: any) => (
                        <ShowGrade
                            key={index}
                            agentId={agentId}
                            gradeName={grade.name || grade.roleName}
                            gradeId={grade.roleId}
                            color={grade.color || grade.roleColor}
                            onGradeAdded={handleGradeAdded}
                            company={company}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AgentGradesComponents;
