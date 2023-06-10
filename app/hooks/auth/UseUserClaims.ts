import GetClaimsFromToken from "../../helpers/auth/GetClaimsFromToken";

export default function UseUserClaims() {
    if (typeof window !== 'undefined' && window.localStorage) {
        const Token = localStorage.getItem('session') as string | undefined;
        if (Token) return GetClaimsFromToken(Token);
    }

    return undefined;
};