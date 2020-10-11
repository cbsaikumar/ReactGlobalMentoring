import { Field } from 'formik';
import React from 'react'

export default function CheckBoxGroup(props) {
    const { label, name, options, ...rest } = props;
    return (
        <div>
            <label>{label}</label>
            <Field name={name} {...rest} className="form-control">
                {
                    (form) => {
                        const { field } = form;
                        return <>
                            <div className="custom-checkbox-group">
                                {options.map(option => (
                                    <div key={option.key} className="checkbox-item">
                                        <label style={{ marginBottom: '0px', paddingRight: '6px' }}>{option.value}</label>
                                        <input type="checkbox" className="custom-checkbox" value={option.value} checked={field.value.includes(option.value)} {...field} onChange={(val) => console.log(val.currentTarget.value)} />
                                    </div>
                                ))}
                            </div>
                        </>
                    }}
            </Field>
        </div>
    )
}
