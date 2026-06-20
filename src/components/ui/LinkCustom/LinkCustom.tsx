import { Link } from "react-router-dom";

interface propsType {
    className?: string;
    to: string;
    children: React.ReactNode;
    variant?: "coklat" | "transparan";
}

const LinkCustom = ( props : propsType) => {
    const { to, children, variant, className } = props;
    return(
        <Link to={to} 
            className={`btn ${className || ''} ${variant === 'coklat' ? 'text-white bg-[#523728] hover:bg-[#a07153] font-bold m-1' : 'text-[#523728] bg-transparent hover:text-[#a07153] border border-[#523728] hover:border-[#a07153] font-bold m-1'}`}
        >
            {children}
        </Link>
    )
}

export default LinkCustom;  