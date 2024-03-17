import React, {useEffect, useState} from 'react';

//TODO ajouter en props les limite max que tout soit dynamique
interface BadgeGeneralPoliceProps {
    LspdOnService: number;
    BcsoOnService: number;
    PoliceInTown: number;
    players: number;
    TotalLspd: number;
    TotalBcso: number;
}

const BadgeGeneralPolice: React.FC<BadgeGeneralPoliceProps> = ({
                                                                   LspdOnService,
                                                                   BcsoOnService,
                                                                   PoliceInTown,
                                                                   players,
                                                                   TotalLspd, TotalBcso
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
    const determineClass = (count: number, max: number) => {
        return count / max < 0.5 ? 'low' : 'high';
    };

    return (
        <div className="badge-general-page-staff">
            <div className="badge-item">
                <div className="badge-title">Date</div>
                <div className="badge-value">{currentTime.toLocaleDateString()}</div>
            </div>
            <div className="badge-item">
                <div className="badge-title">Heure</div>
                <div className="badge-value">{currentTime.toLocaleTimeString()}</div>
            </div>
            <div className={`badge-item badge-animation ${determineClass(LspdOnService, 30)}`}>
                <div className="badge-title">LSPD EN SERVICE</div>
                <div className="badge-value">{LspdOnService} / {TotalLspd}</div>
            </div>
            <div className={`badge-item badge-animation ${determineClass(BcsoOnService, 30)}`}>
                <div className="badge-title">BCSO EN SERVICE</div>
                <div className="badge-value">{BcsoOnService} / {TotalBcso}</div>
            </div>
            <div className={`badge-item badge-animation ${determineClass(players, 60)}`}>
                <div className="badge-title">AGENT EN VILLE</div>
                <div className="badge-value">  {PoliceInTown}</div>
            </div>
            <div className={`badge-item badge-animation ${determineClass(players, 500)}`}>
                <div className="badge-title">Citoyens en villes</div>
                <div className="badge-value">{players} / 500</div>
            </div>

        </div>
    );
};

export default BadgeGeneralPolice;
