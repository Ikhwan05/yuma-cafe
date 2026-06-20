import LinkCustom from "../../ui/LinkCustom";

const AboutSection = () => {
    return (
        <section id="about" className="px-4 bg-amber-50 pb-20 md:pb-0 md:px-5 lg:px-7 2xl:px-20">
            <div className="max-w-7xl mx-auto md:flex items-center gap-20 md:justify-between">
                <div className="md:w-1/2 md:pb-27">
                    <img src="../../../public/strawberry.png" alt="About Us" className="w-full h-auto" />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-xl life-savers-bold mb-1 mt-8">TENTANG YUMACAFE</h2>
                    <h3 className="text-lg life-savers-regular mb-12">Ruang Ketiga untuk Setiap Ceritamu</h3>
                    <p className="text-lg life-savers-regular mb-5">
                        Di YumaCafe, kualitas dan kenyamanan adalah prioritas kami. Terinspirasi dari kehangatan warna cream dan cokelat bumi, setiap sudut ruang dan sajian kami dirancang untuk memberikan ketenangan. Kami percaya bahwa secangkir kopi yang baik dan hidangan yang lezat mampu menyatukan orang-orang serta menciptakan momen yang tak terlupakan.
                    </p>
                    <LinkCustom to="/orders" variant="coklat" className="rounded-full p-5">Pesan Sekarang</LinkCustom>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;