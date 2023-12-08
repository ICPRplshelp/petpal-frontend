export interface LoginInfo {
    token: string;
    refresh: string;
    currentUser?: PetPalUser;  // potentially undefined
}

export interface PetPalUser {
    id: number;
    username: string;
    email: string;
    type: "SHELTER" | "SEEKER";
    phone: string;
    address: string;
    avatar?: string;
    description: string; // all accounts have descriptions, but it only really matters for shelters.
}

export interface Shelter {
    id: number;
    description: string;
    user: number;
}