export default function GetClaimsFromToken(Token: string): { Id?: string, FirstName?: string, LastName?: string } | null {
    const Base64Url = Token.split('.')[1];
    if (!Base64Url) {
        return null;
    }

    const Base64 = Base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const Payload = decodeURIComponent(atob(Base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(Payload);
};