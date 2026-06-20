interface propsTypes {
    type: 'text' | 'email' | 'password' | 'checkbox' | 'radio' | 'date' | 'submit' | 'date' | 'file';
    id?: string;
    name?: string;
    placeholder?: string; 
    className?: string;
    disabled?: boolean
    required: boolean
}


const Input: React.FC<propsTypes>  = ( props ) => {
    const { type, name, placeholder, className, ...propers } = props
    return (
        <input type={type} name={name} placeholder={placeholder} className={className} {...propers} />
    )
}

export default Input;