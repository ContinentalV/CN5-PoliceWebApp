import React from 'react';


interface RatingCoeffProps {
    value: number; // the numerical rating value
    maxValue: number; // the maximum possible value
}

const RatingCoeff: React.FC<RatingCoeffProps> = ({ value, maxValue }) => {
    return (
        <div className="rating-coeff">
            {[...Array(maxValue)].map((_, index) => (
                <span className={`star ${index < value ? 'filled' : ''}`} key={index}>
          {index < value ? '★' : '☆'} {/* Filled or empty star */}
        </span>
            ))}
            {/*  <span className="value">{value.toFixed(2)}</span> {/* Display the numerical value */}
        </div>
    );
};

export default RatingCoeff;
