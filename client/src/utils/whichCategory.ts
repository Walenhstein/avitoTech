export const whichCategory = (category: string) => {
        switch (category) {
            case 'auto':
                return 'Авто';
            case 'electronics':
                return 'Электроника';
            case 'real_estate': 
                return 'Недвижимость';
            default: return '';
        }
    }