export const ALLOWED_ADMIN_EMAILS = [
    "karn.abhinav00@gmail.com",
    "abhinavytagain666@gmail.com",
    "inkly412@gmail.com",
    "aryavrat.studios@gmail.com"
];

export function isSuperAdmin(email: string | undefined | null): boolean {
    if (!email) return false;
    return ALLOWED_ADMIN_EMAILS.includes(email);
}
