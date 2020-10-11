import 'react-datepicker/dist/react-datepicker.css'

import DateView from 'react-datepicker';
import ErrorMessage from './ErrorMessage';
import { Field } from 'formik';
import React from 'react'

export default function DatePicker(props) {
    const { label, name, errors, touched, ...rest } = props;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <label htmlFor={name}>{label}</label>
            <Field name={name} className={'form-control' + (errors.release_date && touched.release_date ? ' is-invalid' : '')}>
                {
                    ({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return <DateView id={name} {...field} {...rest} selected={value ? new Date(value) : ''} onChange={(val) => setFieldValue(name, val)}></DateView>
                    }
                }
            </Field>
            {/* <ErrorMessage name={name} className="invalid-feedback" /> */}
        </div>
    )
}
