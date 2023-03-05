import { useEffect, useState, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({})
    
    useEffect(() => {
        createValidators()
    },[formState]) 
    
    useEffect(() => {
        setFormState(initialForm)
    },[initialForm]) 

    const isFormValid = useMemo(() => {

        for (const validation of Object.values(formValidation)) {
            if (validation) return false
        }
        return true

    }, [formValidation]) 
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formChecked = {}

        for (const formField of Object.keys(formValidations)) {
            
            const [fn, errorMessage] = formValidations[formField]
            formChecked[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage

        }

        setFormValidation(formChecked)

    } 

    return {
        ...formState,
        ...formValidation,
        isFormValid,
        formState,
        onInputChange,
        onResetForm,
    }
}