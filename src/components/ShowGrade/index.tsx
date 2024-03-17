import React from "react";
import {sendRequest} from "../../functions";

interface Grade {
    roleId: string;
    name: string;
    color: string;
    serverId: string;
}

interface PropsGrade {
    gradeName: string;
    gradeId: string;
    color: string;
    agentId?: string;
    onGradeRemoved?: (gradeId: string) => void;
    onGradeAdded?: (gradeId: string) => void;
    company: string;
}

const ShowGrade: React.FC<PropsGrade> = ({
                                             gradeName,
                                             color,
                                             gradeId,
                                             agentId,
                                             onGradeRemoved,
                                             onGradeAdded,
                                             company
                                         }) => {
    const handleRemoveGrade = async () => {
        try {
            const response = await sendRequest('post', 'discord/members/roles/updates', {
                discordId: agentId,
                companyId: company,
                roleId: gradeId,
                action: 'remove'
            });
            if (response !== undefined && onGradeRemoved) {
                onGradeRemoved(gradeId);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleAddGrade = async () => {
        try {
            const response = await sendRequest('post', 'discord/members/roles/updates', {
                discordId: agentId,
                companyId: company,
                roleId: gradeId,
                action: 'add'
            });
            if (response !== undefined && onGradeAdded) {
                onGradeAdded(gradeId);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="grade-container" style={{color: (color === "#000000" || color === "#080808") ? "#fff" : color}}>
            <p onClick={onGradeRemoved ? handleRemoveGrade : handleAddGrade} className="grade">{gradeName}</p>
        </div>
    );
}

export default ShowGrade;
