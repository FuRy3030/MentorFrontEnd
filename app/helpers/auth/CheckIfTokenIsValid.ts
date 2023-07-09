export default function CheckIfTokenIsValid() {
    if (typeof window !== 'undefined' && window.localStorage) {
        const ExpirationDateString: string | null = localStorage.getItem('expiration');
        const ExpirationDate = new Date(ExpirationDateString ? ExpirationDateString : '1970-01-01T00:00:00Z');

        if (ExpirationDate >= new Date()) {
            return true;
        } else {
            return false;
        }
    }
};