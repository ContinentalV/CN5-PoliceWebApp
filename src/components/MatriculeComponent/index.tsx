import React, {useState} from "react";
import {AxiosResponse} from "axios";
import {sendRequest} from "../../functions";

interface Matricule {
    discordId: string;
    matricule: number[];
    nickname: string;
    company: string;
}

const MatriculeComponent: React.FC<Matricule> = ({matricule, discordId, nickname, company}) => {
    const [selectedMatricule, setSelectedMatricule] = useState<number | null>(null);

    const handleSelectMatricule = (e: any, selectedMat: number) => {
        e.preventDefault();
        if (selectedMatricule === selectedMat) {
            setSelectedMatricule(null); // Désélectionne le matricule si déjà sélectionné
        } else {
            console.log(selectedMat)
            setSelectedMatricule(selectedMat); // Sélectionne le nouveau matricule
        }
    };
    const handleSendMatricule = async () => {

        if (selectedMatricule !== null) {
            try {
                const response: AxiosResponse = await sendRequest("put", "members/matriculeUpdate", {
                    newMat: selectedMatricule,
                    target: discordId
                });
                console.log("Matricule envoyé avec succès :", response.data);
                // Réinitialiser l'état du matricule sélectionné après l'envoi réussi

                const discordResponse = await sendRequest("patch", "discord/members/:discordId/rename/matricule", {
                    discordId: discordId,
                    oldUserName: nickname,
                    mat: selectedMatricule,
                    companyId: company
                })
                console.log("Renommage sur Discord réussi :", discordResponse);

                setSelectedMatricule(null);
            } catch (error) {
                console.error("Erreur lors de l'envoi du matricule :", error);
            }
        } else {
            console.warn("Aucun matricule sélectionné.");
        }
    };
    return (
        <div className="matricule-container">
            <div className="liste-mat">
                {matricule.map((mat, index) => (
                    <div
                        onClick={(e) => handleSelectMatricule(e, mat)}
                        className={`background-matricule ${selectedMatricule === mat ? 'active' : ''}`}
                        key={index}
                    >
                        <span className="matricule">{mat}</span>
                    </div>
                ))}
            </div>
            <div className="form-update">
                {selectedMatricule !== null ? <p>Vous avez choisis: {selectedMatricule} </p> : ""}
                <button onClick={handleSendMatricule} className="btn">Validez</button>
            </div>
        </div>
    );
};

export default MatriculeComponent;
