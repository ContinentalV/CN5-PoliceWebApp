import React, {useEffect, useState} from 'react';
import {convertirMinutesEnHeureMinutes} from "../../utils/functions";

interface BadgeGeneralPagePoliceProps {
    onService: number;
    onCity: number;
    totalHours: number;
    totalSalaryCost: number;
    TotalSalaryCostWithTaxe: number;

}

const BadgeGeneralPolice: React.FC<BadgeGeneralPagePoliceProps> = ({
                                                                       onService,
                                                                       totalHours,
                                                                       totalSalaryCost,
                                                                       onCity,
                                                                       TotalSalaryCostWithTaxe
                                                                   }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // Function to determine the class based on the count


    return (
        <div className="badge-general-page-staff">
            <div className="badge-item">
                <div className="badge-title">DATE</div>
                <div className="badge-value">{currentTime.toLocaleDateString()}</div>
            </div>
            <div className="badge-item">
                <div className="badge-title">HEURE</div>
                <div className="badge-value">{currentTime.toLocaleTimeString()}</div>
            </div>
            <div className={`badge-item badge-animation  `}>
                <div className="badge-title">AGENT EN SERVICE</div>
                <div className="badge-value"> {onService}</div>
            </div>
            <div className={`badge-item badge-animation  `}>
                <div className="badge-title">AGENT EN VILLE</div>
                <div className="badge-value"> {onCity} </div>
            </div>
            <div className={`badge-item badge-animation  `}>
                <div className="badge-title">TOTAL HEURES GLOBAL</div>
                <div className="badge-value">{convertirMinutesEnHeureMinutes(totalHours)}</div>
            </div>
            <div className={`badge-item badge-animation  `}>
                <div className="badge-title"> SALAIRE HORS TAXE</div>
                <div className="badge-value"> {totalSalaryCost.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                })}</div>
            </div>
            <div className={`badge-item badge-animation  `}>
                <div className="badge-title"> SALAIRE TTC</div>
                <div className="badge-value"> {TotalSalaryCostWithTaxe.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                })}</div>
            </div>

        </div>
    );
};

export default BadgeGeneralPolice;
