import React, { Fragment } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef(({ label, input }, ref) => {

    return (
        <Fragment>
            <div className={classes.input}>
                <label htmlFor={input.id}>{label}</label>
                <input {...input} ref={ref} />
            </div>

        </Fragment>
    )
})

export default Input