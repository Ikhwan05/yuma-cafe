import Card from "../../ui/Card";
import LinkCustom from "../../ui/LinkCustom";

const MenuSection = () => {
    return (
        <section id="menu" className="menu-section px-4 md:px-5 lg:px-7 2xl:px-20 lg:py-25 py-10 bg-[#523728] mx-auto">
            
                <h2 className="text-3xl text-white life-savers-extrabold mb-8 text-center">Menu Kami</h2>
                <div className="items-center min-h-screen flex flex-col md:flex-wrap lg:flex-row justify-center gap-6 max-w-7xl mx-auto">
                    <Card/>
                    <Card />
                    <Card />
                </div>
                <div className="card-actions mt-10 flex justify-end mr-4">
                    <LinkCustom to="/menu" variant="coklat" className="rounded-full p-5 start-end">Lihat Semua Menu &gt;</LinkCustom>
                </div>
    
        </section>
    )
}

export default MenuSection;