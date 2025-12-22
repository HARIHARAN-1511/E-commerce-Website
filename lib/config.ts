export const ADMIN_CONFIG = {
    // List of emails allowed to access the admin dashboard
    // IMPORTANT: Update this with your actual admin email
    whitelistedEmails: [
        "admin@psvitsolution.in"
    ],

    isAdmin: (email?: string) => {
        if (!email) return false;
        return ADMIN_CONFIG.whitelistedEmails.includes(email.toLowerCase());
    }
};
