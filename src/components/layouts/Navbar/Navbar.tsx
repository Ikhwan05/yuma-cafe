import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LinkCustom from "../../ui/LinkCustom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed navbar z-90 transition-all duration-300 mx-auto w-full px-4 lg:px-7 2xl:px-20
                        ${
                            isScrolled
                                ? "bg-amber-50 shadow-md"
                                : "bg-white/10 backdrop-blur-md"
                        }`}>
            <div className="navbar-start">
                {/* <a className="btn btn-ghost text-xl hover:bg-transparent hover:text-current">daisyUI</a> */}
                <Link to="/"><img src="../public/logo.png" alt="Logo" className="w-15 h-15 ml-3" /></Link>
                
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a className="hover:bg-transparent hover:text-current" href="#home">Home</a></li>
                <li><a className="hover:bg-transparent hover:text-current" href="#about">About</a></li>
                <li><a className="hover:bg-transparent hover:text-current" href="#menu">Menu</a></li>
                <li><a className="hover:bg-transparent hover:text-current" href="#contact">Contact</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="relative">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-transparent border-none" onClick={toggleMenu}>
                        { isOpen ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                         <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                                    </svg>
                                    : 
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                        <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
                                    </svg>
                        }
                    </div>
                    {isOpen && (
                        <ul
                            tabIndex={-1}
                            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-7 w-[95vw] p-8 shadow left-1/2 -translate-x-1/2 fixed left-1/2 top-16 -translate-x-1/2">
                            <li><a className="hover:bg-transparent hover:text-current">Item 1</a></li>
                            <li><a className="hover:bg-transparent hover:text-current">Item 3</a></li>
                            <li><LinkCustom to="/register" variant="transparan" className="btn text-[#523728] bg-transparent hover:text-[#a07153] border border-[#523728] hover:border-[#a07153] font-bold m-1">Daftar</LinkCustom></li>
                            <li><LinkCustom to="/login" variant="coklat" className="btn text-white bg-[#523728] hover:bg-[#a07153] font-bold m-1">Masuk</LinkCustom></li>
                        </ul>

                    )}
                </div>
                <LinkCustom to="/register" variant="transparan" className="hidden lg:flex">Daftar</LinkCustom>
                <LinkCustom to="/login" variant="coklat" className="hidden lg:flex">Masuk</LinkCustom>
            </div>
        </nav>
    )
}

export default Navbar;