export interface Paginated<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}

export interface PassedInProps<T> {
    item: T;

    // for internal use

    // if the component isn't included in a list
    single?: boolean;
    // the route the component belongs in - this should be declared on a page
    route?: string;
}

/**
 * AsString<T> is T with all of its fields typed as string.
 */
export type AsString<T> = {
    // LOVE THIS FEATURE https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
    [K in keyof T]: string;
}


// FORMS AND STUFF IDK


export type Opt = {
    actual: string;
    display: string;
}

/**
 * Use this if you want to have some fields be
 * options.
 */
export type DropDownOption<T> = {
    // the name of the field you are targeting
    field: keyof T;
    // all possible options. Remember to include an empty string if you want the default to be empty
    options: Opt[];
}






