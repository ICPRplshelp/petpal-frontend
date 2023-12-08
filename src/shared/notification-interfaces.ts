export type NotificationPetPal = {
    // relative link, appended to
    link: string;
    author: number;
    id: number;
    subject: string;
    content: string;
    read: boolean;
    created: string;

    comment_id: number | null;
    application_id: number | null;

    comment_link?: string;
    application_link?: string;
}