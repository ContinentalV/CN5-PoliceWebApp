import React from 'react';

interface ProgressBarProps {
    value: number; // La valeur actuelle de la progression
    maxValue: number; // La valeur maximale de la progression

}

// Fonction pour déterminer la classe de progression
function determineProgressClass(value: number, maxValue: number) {
    const percentage = (value / maxValue) * 100;
    if (percentage <= 0) {
        return 'empty';
    } else if (percentage < 30) {
        return 'low';
    } else if (percentage < 50) {
        return 'medium';
    } else if (percentage < 80) {
        return 'high';
    } else {
        return 'full';
    }
}

const ProgressBarQuota: React.FC<ProgressBarProps> = ({value, maxValue}) => {
    const progressClass = determineProgressClass(value, maxValue);
    const fillPercentage = Math.min((value / maxValue) * 100, 100); // Limiter à 100% maximum

    return (
        <div className="progress-bar-container">
            <div className={`progress-bar ${progressClass}`} style={{width: `${fillPercentage}%`}}>
                <div className="progress-fill"/>
            </div>
            <span className="progress-value">{`${Math.floor(fillPercentage)}%`}</span>
        </div>
    );
};

export default ProgressBarQuota;
