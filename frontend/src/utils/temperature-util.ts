export const getBackgroundColor = (temp: number, dampen: boolean): string => {
    if (dampen) {
        if (temp <= 32) {
            return 'linear-gradient(to right, #e6efff, #e6fffc)'; // Very Light Cold: Very Light Blue to Very Light Cyan
        } else if (temp <= 60) {
            return 'linear-gradient(to right, #e6fffc, #e6ffe6)'; // Very Light Cool: Very Light Cyan to Very Light Green
        } else if (temp <= 80) {
            return 'linear-gradient(to right, #e6ffe6, #fffde6)'; // Very Light Warm: Very Light Green to Very Light Yellow
        } else {
            return 'linear-gradient(to right, #fffde6, #ffe6e6)'; // Very Light Hot: Very Light Yellow to Very Light Red
        }
    } else {
        if (temp <= 32) {
            return 'linear-gradient(to right, #abc4ff, #abfff8)'; // Cold: Blue to Cyan
        } else if (temp <= 60) {
            return 'linear-gradient(to right, #abfff8, #9effa1)'; // Cool: Cyan to Green
        } else if (temp <= 80) {
            return 'linear-gradient(to right, #9effa1, #fff49e)'; // Warm: Green to Yellow
        } else {
            return 'linear-gradient(to right, #fff49e, #ff9696)'; // Hot: Yellow to Red
        }
    }
};