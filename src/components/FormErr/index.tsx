import React from 'react';

function FormErr(props: { message: string }) {
    return (
        <>
            {props.message === "" ? <></> : <div style={{
                color: 'red',
                display: 'block',
                fontWeight: 'bold',
            }}>
                {props.message}
            </div>}
        </>
    );
}

export default FormErr;