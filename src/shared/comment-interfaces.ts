export interface CommentSharedFields {
    // who submitted the comment
    user: number;
    rating: number;
    content: string;
    target: "" | "shelter" | "application";
    created: Date;
}

export interface CommentApplication extends CommentSharedFields {
    application: number;
}

export interface CommentShelter extends CommentSharedFields {
    shelter: number;
}

export interface CommentT extends CommentSharedFields {
    id: number;
    application?: number;
    shelter?: number;
    shelter_id?: number;
}


export interface CommentA {
    content: string;
    rating: number;

}