export const getBackgroundColor = (temp: number): string => {
    if (temp <= 32) {
        return 'linear-gradient(to right, #abc4ff, #abfff8)'; // Cold: Blue to Cyan
    } else if (temp <= 60) {
        return 'linear-gradient(to right, #abfff8, #9effa1)'; // Cool: Cyan to Green
    } else if (temp <= 80) {
        return 'linear-gradient(to right, #9effa1, #fff49e)'; // Warm: Green to Yellow
    } else {
        return 'linear-gradient(to right, #fff49e, #ff9696)'; // Hot: Yellow to Red
    }
};

// TODO: MAKE SURE THIS DOESNT RETURN A DEFAULT VALUE, DISPLAY ERROR MESSAGE
export const processLocation = (location: string): string => {
    const parts = location.split(',');
    const out = parts[0];
    if (parts.length === 1) {
        return out;
    } else if (parts.length > 1) {
        return out + ', ' + parts[1];
    }
    return "Your Current Location";
};