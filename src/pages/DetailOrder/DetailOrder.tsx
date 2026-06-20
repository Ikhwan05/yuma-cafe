import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { ICart, IOrder } from "../../types/order";
import { getOrderDetailById } from "../../services/order.service";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const DetailOrder = () => {
    const { id } = useParams();
    const [ order, setOrder ] = useState<IOrder | null>(null);

    useEffect( () => {
        const fetchOrder = async () => {
            const result = await getOrderDetailById(`${id}`)
            setOrder(result);
        }
        fetchOrder()
    }, [])



    return (
        <main className="min-h-screen bg-amber-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    <h1 className="font-bold text-2xl text-[#523728]">
                        Detail Order
                    </h1>

                    <Link to="/orders">
                        <Button variant="coklat">Back</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Detail Order */}
                    <div className="lg:col-span-1 bg-[#523728]/8 backdrop-blur-lg p-5 rounded-2xl shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold text-[#523728]">
                                    Order ID
                                </p>
                                <span className="text-sm text-[#523728]">
                                    {order?.id}
                                </span>
                            </div>

                            <div>
                                <p className="font-semibold text-[#523728]">
                                    Customer Name
                                </p>
                                <span className="text-sm text-[#523728]">
                                    {order?.customer_name}
                                </span>
                            </div>

                            <div>
                                <p className="font-semibold text-[#523728]">
                                    Table
                                </p>
                                <span className="text-sm text-[#523728]">
                                    {order?.table_number}
                                </span>
                            </div>

                            <div>
                                <p className="font-semibold text-[#523728]">
                                    Status
                                </p>
                                <span className="text-sm text-[#523728]">
                                    {order?.status}
                                </span>
                            </div>

                            <div>
                                <p className="font-semibold text-[#523728]">
                                    Total
                                </p>
                                <span className="text-sm text-[#523728]">
                                    Rp {order?.total}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* List Menu */}
                    <div className="lg:col-span-2 bg-[#523728]/8 backdrop-blur-lg p-5 rounded-2xl shadow-sm">
                        <h2 className="font-bold text-lg text-[#523728] mb-4">
                            Ordered Items
                        </h2>

                        <div className="space-y-4">
                            {order?.cart.map((item: ICart) => (
                                <div
                                    key={item.menuItem.id}
                                    className="flex items-center gap-4 border-b border-[#523728]/10 pb-4"
                                >
                                    <img
                                        src={item.menuItem.image_url}
                                        alt={item.menuItem.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <p className="font-semibold text-[#523728]">
                                            {item.quantity} × {item.menuItem.name}
                                        </p>

                                        <p className="text-sm text-[#523728]/70">
                                            ${item.menuItem.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default DetailOrder;