import LinkCustom from "../LinkCustom";

const Card = () => {
    return (
        <div className="card bg-base-100 w-full max-w-96 shadow-sm">
            <figure>
                <img
                src="../../../public/strawberry.png"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="life-savers-extrabold text-xl">Card Title</h2>
                <p className="life-savers-bold font-medium">A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <p className="life-savers-bold font-medium my-6">Rp 80.000</p>
                <div className="card-actions justify-start">
                <LinkCustom to="/checkout" variant="coklat">Beli Sekarang</LinkCustom>
                </div>
            </div>
        </div>
    )
}

export default Card;