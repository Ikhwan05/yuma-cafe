import LinkCustom from "../../ui/LinkCustom";

const HeroSection = () => {
    return (
        <section id="home" className="md:px-5 lg:px-7 2xl:px-20 py-30 md:py-15 bg-[url('../../../public/bg-hero.png')] bg-cover bg-center w-full">
            <div className="container md:flex items-center justify-center mx-auto max-w-7xl gap-20">
                <div className="hero-content block md:w-1/2">
                    <h1 className="text-5xl font-semibold text-[#523728] life-savers-extrabold leading-tight">Temukan Kehangatan di Setiap Cangkir</h1>
                    <h3 className="text-lg text-[#523728] life-savers-bold leading-relaxed mt-10">Kami selalu menyambutmu dengan beragam pilihan kopi terbaik dan hidangan penutup yang dibuat sepenuh hati. Tempat sempurna untuk cerita dan inspirasimu hari ini.</h3>
                    <div className="mt-8">
                        <LinkCustom to="/login" variant="coklat" className="p-5">Masuk</LinkCustom>
                        <LinkCustom to="/orders" variant="transparan" className="p-5">Pesan Sekarang</LinkCustom>
                    </div>
                </div>
                <div className="hero-image hidden md:block md:w-1/2">
                    <img src="../../../public/abit-home.png" alt="Hero Image" className="w-full h-auto" />
                </div>
            </div>
        </section>
    );
}

export default HeroSection;