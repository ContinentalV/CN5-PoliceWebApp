import React, {useState} from 'react';
import {convertirMinutesEnHeureMinutes} from "../../utils/functions";
import {sendRequest} from "../../functions";

interface UpdateTimeAgentFormProps {
    discordId: string;
    companyId: string;
}

const UpdateTimeAgentForm: React.FC<UpdateTimeAgentFormProps> = ({discordId, companyId}) => {
    const initialFormData = {
        temps: "",
        mode: '',
        targetId: discordId,
    };
    const secondInitialFormData = {
        newName: "",
        companyId: companyId,
        discordId: discordId,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [timeResult, setTimeResult] = useState("");
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean | undefined>(undefined);
    const [showAlert, setShowAlert] = useState(false); // État pour afficher l'alerte de notification
    const [formResponse, setFormResponse] = useState("");
    const [showConversionResult, setShowConversionResult] = useState(false); // État pour afficher le résultat de la conversion
    const [secondFormData, setSecondFormData] = useState(secondInitialFormData);
    const [secondFormResponse, setSecondFormResponse] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name === 'temps') {
            setTimeResult(convertirMinutesEnHeureMinutes(Number(value)));
            setShowConversionResult(value !== "" && Number(value) !== 0); // Afficher le résultat uniquement si la valeur n'est pas vide et n'est pas égale à zéro
        }

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        if (name === 'mode') {
            setIsCheckboxChecked(true);
            setShowAlert(false); // Réinitialiser l'alerte de notification lorsque l'utilisateur sélectionne une option
        }
    };

    const handleSubmit = async () => {

        if (isCheckboxChecked) {
            const dataToSend = {
                ...formData,
                discordId
            };
            try {
                const response = await sendRequest('put', 'service/add', dataToSend);
                console.log("Réponse du serveur :", response);
                setFormResponse(response.message);
                setFormData(initialFormData); // Réinitialiser le formulaire après soumission réussie
                setShowConversionResult(false); // Masquer le résultat de la conversion après soumission réussie
                setIsCheckboxChecked(undefined); // Réinitialiser la checkbox après soumission réussie

                // Effacer la réponse après 5 secondes
                setTimeout(() => {
                    setFormResponse("");
                }, 5000);

            } catch (error) {
                console.error('Erreur lors de l\'envoi du formulaire :', error);
                // Gérer l'erreur ici
            }
        } else {
            setShowAlert(true); // Afficher l'alerte de notification si aucune option n'est sélectionnée

            // Effacer l'alerte après 5 secondes
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
    };

    const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSecondFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSecondSubmit = async () => {

        const dataToSend = {
            ...secondFormData,
            discordId,
            companyId

        };
        try {
            const response = await sendRequest('patch', 'discord/members/:discordId/discord/rename', dataToSend);
            console.log("Réponse du serveur :", response);

            setSecondFormResponse(response.message);
            setSecondFormData(secondInitialFormData); // Réinitialiser le formulaire après soumission réussie


            // Effacer la réponse après 5 secondes
            setTimeout(() => {
                setSecondFormResponse("");
            }, 5000);

        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire :', error);
            // Gérer l'erreur ici
        }
    };

    return (
        <div className="form-container">
            {<div className={`alert ${showAlert ? "showNotif" : ""}`}>Veuillez sélectionner le mode:
                Ajouter/Retirer</div>}
            {<div className={`form-response ${formResponse ? "showNotif" : ""}`}>{formResponse}</div>}
            {<div className={`form-response ${secondFormResponse ? "showNotif" : ""}`}>{secondFormResponse}</div>}
            {showConversionResult && (
                <div className="conversion-options">
                    <span> {timeResult} </span>
                </div>
            )}
            <div className="left">

                <form>
                    <label className="form-label" htmlFor="rename"> Renomer l'agent</label>
                    <input value={secondFormData.newName}
                           onChange={handleSecondChange}
                           required
                           className="form-input"
                           type="text"
                           name="newName"/>

                </form>
                <button onClick={handleSecondSubmit} className="submit-button">Renomer !</button>
            </div>

            <div className="right">
                <form>
                    <label htmlFor="hours" className="form-label">
                        Heure en minutes
                    </label>
                    <input
                        type="number"
                        id="hours"
                        name="temps"
                        value={formData.temps}
                        onChange={handleChange}
                        placeholder=" "
                        className="form-input"
                        required
                    />
                    {showConversionResult && (
                        <div className="conversion-options">
                            <span> {timeResult} </span>
                        </div>
                    )}
                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="radio"
                                name="mode"
                                value="add"
                                checked={formData.mode === 'add'}
                                onChange={handleChange}
                            />
                            Ajouter
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="radio"
                                name="mode"
                                value="remove"
                                checked={formData.mode === 'remove'}
                                onChange={handleChange}
                            />
                            Retirer
                        </label>
                    </div>

                </form>

                <button onClick={handleSubmit} type="submit" className="submit-button">
                    Envoyer
                </button>
            </div>
        </div>
    );
};

export default UpdateTimeAgentForm;
