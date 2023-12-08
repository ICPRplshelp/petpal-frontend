import React from "react";
import {AsString, DropDownOption} from "../../shared/universal-interfaces";
import {Form} from "react-bootstrap";
import FormErr from "../FormErr";


function snakeCaseToTitleCase(text: string): string {
    const str_ac: string[] = [];
    const splitted = text.split("_");
    for (let s of splitted) {
        str_ac.push(s.charAt(0).toUpperCase() + s.slice(1));
    }
    return str_ac.join(" ");

}


function keysOf<T>(obj: T): (keyof T)[] {
    let acc: (keyof T)[] = [];
    for (const key in obj) {
        acc.push(key);
    }
    return acc;
}


type FFProps<T> = {
    mandatory?: (keyof T)[];
    optional?: (keyof T)[];
    obj: T;
    err: AsString<T>;
    binder: (target: keyof T) => ((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void);
    largeFields?: (keyof T)[];
    dropDownOptions?: DropDownOption<T>[];
    disabled?: (keyof T)[];

}


/*
This looks hard to read, because I used the extract method refactoring tool. You are not meant to use this;
use your ignorance.
*/

type CFF<T> = {
    k: keyof T,
    // mandatoryTFields: (keyof T)[],
    // optionalTFields: (keyof T)[],
    mandatory: boolean,
    obj: T,
    b: (target: keyof T) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    petErr: AsString<T>,
    largeFields: (keyof T)[];
    dropDownOptions: DropDownOption<T>[];
    disabled: (keyof T)[];
}


function IndividualFormField<T extends (Record<keyof T, number | string | undefined>)>({
                                                                                           k,
                                                                                           mandatory,
                                                                                           obj,
                                                                                           b,
                                                                                           petErr,
                                                                                           largeFields,
                                                                                           dropDownOptions,
                                                                                           disabled

                                                                                       }: CFF<T>) {
    const k2 = k;
    const keyName = snakeCaseToTitleCase(k.toString());
    const isRequired = mandatory;
    // const isOptional = !mandatory;
    // assertions: (isRequired or isOptional) is true

    if (typeof obj[k2] === 'string' || typeof obj[k2] === 'number') {
        let formControlType = (typeof obj[k2] === 'string') ? "text" : "number";


        let ddo_var = dropDownOptions.find(t => t.field === k2);
        if (ddo_var !== undefined && typeof obj[k2] === 'string') {
            return (<Form.Group className="p-2 fw-bold"
            >
                <Form.Label>{keyName}</Form.Label>
                {isRequired ? <>
                    <Form.Text>*</Form.Text>
                </> : <></>}
                <Form.Control
                    disabled={disabled.includes(k2)}
                    required={isRequired}
                    as="select"
                    value={obj[k2]}
                    onChange={b(k2)}
                    name={keyName} style={{minWidth: '100%'}}>
                    {
                        ddo_var.options.map((v, i) => {
                            return <option key={i} value={v.actual}> {v.display} </option>
                        })
                    }
                </Form.Control>
                <FormErr message={petErr[k2]}/>
            </Form.Group>)
        } else if (largeFields.includes(k2) && typeof obj[k2] === 'string') {
            return (<Form.Group className="p-2 fw-bold"
            >
                <Form.Label>{keyName}</Form.Label>
                {isRequired ? <>
                    <Form.Text>*</Form.Text>
                </> : <></>}
                <Form.Control
                    disabled={disabled.includes(k2)}
                    required={isRequired}
                    as="textarea" rows={5}
                    value={obj[k2]}
                    onChange={b(k2)}
                    name={keyName} style={{minWidth: '100%'}}/>
                <FormErr message={petErr[k2]}/>
            </Form.Group>)
        } else {
            return (<Form.Group className="p-2 fw-bold"
            >
                <Form.Label>{keyName}</Form.Label>
                {isRequired ? <>
                    <Form.Text>*</Form.Text>
                </> : <></>}
                <Form.Control
                    disabled={disabled.includes(k2)}
                    required={isRequired}
                    type={formControlType}
                    value={obj[k2]}
                    onChange={b(k2)}
                    name={keyName} style={{minWidth: '100%'}}/>
                <FormErr message={petErr[k2]}/>
            </Form.Group>)
        }
    }
    return <></>;
}


/**
 * A component that gives me all the fields of a form that only accepts strings or numbers as JSX HTML
 * Ordering is always mandatory first, then optional, in the order they were given in the list passed in
 *
 * @param mandatory All mandatory fields to show
 * @param optional All optional fields to show
 * @param obj The form data object
 * @param err The form error object
 * @param binder Just look at what I did to understand this
 * @param largeFields Only if the field is a string, make these fields large
 * @param dropDownOptions
 * @param disabled
 * @constructor
 */
export function FormFields<T extends (Record<keyof T, number | string>)>({
                                                                             mandatory,
                                                                             optional,
                                                                             obj,
                                                                             err,
                                                                             binder,
                                                                             largeFields,
                                                                             dropDownOptions,
                                                                             disabled
                                                                         }: FFProps<T>) {
    const largeFields2 = largeFields ?? [];
    const mandatory2 = mandatory ?? [];
    const optional2 = optional ?? [];
    const ddo2 = dropDownOptions ?? [];
    const disabled2 = disabled ?? [];
    return (
        <>
            {
                mandatory2.map((k, i) => {
                    return <IndividualFormField<T>
                        key={i}
                        k={k}
                        mandatory={true}
                        largeFields={largeFields2}
                        b={binder}
                        petErr={err}
                        obj={obj}
                        dropDownOptions={ddo2}
                        disabled={disabled2}
                    />
                })
            }

            {
                optional2.map((k, i) => {
                    return <IndividualFormField<T>
                        key={i}
                        k={k}
                        mandatory={false}
                        largeFields={largeFields2}
                        b={binder}
                        petErr={err}
                        obj={obj}
                        dropDownOptions={ddo2}
                        disabled={disabled2}
                    />
                })
            }
        </>
    );
}

export default FormFields;


/*

            {
                keysOf<T>(obj).map((k, i) => {
                    return <IndividualFormField<T>
                        key={i}
                        k={k}
                        mandatoryTFields={mandatory2}
                        optionalTFields={optional2}
                        largeFields={largeFields2}
                        b={binder}
                        petErr={err}
                        obj={obj}
                    />
                })
            }


 */