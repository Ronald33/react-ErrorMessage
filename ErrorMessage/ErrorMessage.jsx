import DefaultErrorMessage from "./DefaultErrorMessage"

let _errorMessageComponent = null

const ErrorMessage = ({ errors, name, component }) =>
{
    if(!name)   { console.error('ErrorMessage: falta el prop "name"');   return null }
    if(!errors) { console.error('ErrorMessage: falta el prop "errors"'); return null }

    /*
        Orden de prioridad:
        1. (menor) DefaultErrorMessage     → fallback si no se configuró nada
        2.         setComponent()          → global, reemplaza el default
        3. (mayor) prop component          → solo esta instancia, pisa al global
    */
    const Message = component || _errorMessageComponent || DefaultErrorMessage

    if(!errors[name]) { return null }

    return <Message message={errors[name].message} />
}

ErrorMessage.setComponent = (component) =>
{
    _errorMessageComponent = component
}

export default ErrorMessage