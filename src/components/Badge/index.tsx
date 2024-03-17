import React from "react";


interface BadgeProps {

    value: string | number | JSX.Element;
    type: string;
}

const Badge: React.FC<BadgeProps> = ({ value, type }) => {
    const getValueClass = (type: string, value: string | number | JSX.Element) => {
        switch (type) {
            case "count": {
                const [current, max] = value.toString().split("/").map(Number);
                if (current / max < 0.5) return "low";
                if (current / max < 0.7) return "medium";
                return "high";
            }
            case "date":
                return "date";
            case "grade":
                switch (value) {
                    case "Modo":
                        return "modo";
                    case "Admin":
                        return "admin";
                    case "Support":
                        return "support";
                    case "Responsable":
                        return "resp";
                    case "Dev":
                    return "Dev"
                    default:
                        return "";
                }
            case "time":
                return "time";
            case "productivity":
                const score = parseFloat(value.toString().replace("%", ""));
                if (score < 50) return "low";
                if (score < 75) return "medium";
                return "high";
            default:
                return "";
        }
    };


    const valueClass = getValueClass(type, value);


    return (
        <div className="badge">
            {
                typeof value === "string" || typeof value === "number" ? (
                    <p className={`count-badge ${valueClass}`}>{value}</p>
                ) : (
                    <div className={`count-badge ${valueClass}`}>{value}</div>
                )
            }

        </div>
    );
};

export default Badge;
