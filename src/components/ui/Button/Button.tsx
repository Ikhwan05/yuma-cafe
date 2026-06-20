interface propsType {
    className?: string;
    label?: string;
    id?: string;
    onClick?: () => void;
    onchange?: () => void;
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    variant: "coklat" | "transparan";
    disabled?: boolean;
}

const Button = (props : propsType) => {
    const { className, id, onClick, onchange, children, type, variant} = props;

    return (
        <button 
            className={`btn ${className || ''} ${variant === 'coklat' ? 'text-white bg-[#523728] hover:bg-[#a07153] font-bold m-1' : 'text-[#523728] bg-transparent hover:text-[#a07153] border border-[#523728] hover:border-[#a07153] font-bold m-1'}`}
            id={id}
            onClick={onClick}
            onChange={onchange}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;