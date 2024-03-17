import React from "react";
import {sendRequest} from "../../functions";


interface CompanyProps {
    company: string
}

const ResetDataAgentComponent: React.FC<CompanyProps> = ({company}) => {
    const [companyToClearData] = React.useState(company);

    const handleReset = async () => {
        try {
            // Envoyer la demande à l'API
            await sendRequest("post", "service/resetAll", {company: companyToClearData});
            alert("Données réinitialisées avec succès !");
        } catch (error) {
            console.error("Erreur lors de la réinitialisation des données :", error);
            // Afficher un message d'erreur en cas d'échec de la demande
            alert("Une erreur est survenue lors de la réinitialisation des données.");
        }
    };

    const handleNoClick = () => {
        // Afficher une alerte pour confirmer l'annulation de la réinitialisation
        if (window.confirm("Voulez-vous annuler la réinitialisation des données ?")) {

            console.log("Composant supprimé !");
        }
    };

    return (
        <div className="reset-container">
            <p className="confirm-message-reset">Confirmez-vous le reset ? </p>
            <button className="btn-confirm-yes" onClick={handleReset}>Oui</button>
            <button className="btn-confirm-no" onClick={handleNoClick}>Non</button>
        </div>
    );
}

export default ResetDataAgentComponent;
