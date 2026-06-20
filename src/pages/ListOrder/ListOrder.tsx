import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { getOrders, updateOrder } from "../../services/order.service";
import Button from "../../components/ui/Button";
import type { IOrder } from "../../types/order";
import { removeLocalStorage } from "../../utils/storage";

const ListOrder = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // State Tambahan untuk Loading dan Pagination Meta
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);

    // Ambil halaman aktif dari URL, default ke halaman 1
    const currentPage = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        const fetchOrder = async () => {
            setIsLoading(true);
            try {
                // Mengambil data order dari service (getOrders tidak menerima argumen)
                const result = await getOrders();
                setOrders(result.data || []);

                // Menentukan total halaman berdasarkan response dari metadata API Anda
                if (result.metadata?.totalPages) {
                    setTotalPages(result.metadata.totalPages);
                } else if (result.totalPages) {
                    setTotalPages(result.totalPages);
                } else if (result.metadata?.total) {
                    // Fallback hitung manual jika API hanya melempar total item (misal per halaman isi 10 data)
                    setTotalPages(Math.ceil(result.metadata.total / 10) || 1);
                } else {
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                setOrders([]);
                setTotalPages(1);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [currentPage, refetchTrigger]); // Berjalan ulang jika halaman berubah atau ada trigger update status

    const handleCompleteOrder = async (id: string) => {
        try {
            await updateOrder(id, { status: 'COMPLETED' });
            // Memicu useEffect untuk fetch ulang data terbaru
            setRefetchTrigger(prev => !prev);
        } catch (error) {
            console.error("Failed to complete order:", error);
        }
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    };

    const handleLogout = () => {
        removeLocalStorage('auth');
        navigate('/');
    };

    return (
        <main className="min-h-screen bg-amber-50 p-4 md:p-6 text-[#523728]">
            <section className="max-w-7xl mx-auto">

                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-[#523728]">
                        Order List
                    </h1>

                    <div className="flex flex-wrap gap-2">
                        <Link to="/create">
                            <Button variant="coklat">
                                Create Order
                            </Button>
                        </Link>

                        <Button
                            variant="transparan"
                            onClick={handleLogout}
                        >
                            Log Out
                        </Button>
                    </div>
                </div>

                {/* TABLE SECTION */}
                <div className="rounded-2xl bg-[#523728]/5 backdrop-blur-lg shadow-sm overflow-hidden border border-[#523728]/10">
                    <div className="overflow-x-auto">
                        <table className="table w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#523728] border-b border-[#523728]/20 bg-[#523728]/5">
                                    <th className="p-4">No</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Table</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    /* LOADING SKELETON ANIMATION */
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="border-b border-[#523728]/10 animate-pulse">
                                            <td className="p-4"><div className="h-4 bg-[#523728]/10 rounded w-6" /></td>
                                            <td className="p-4"><div className="h-4 bg-[#523728]/10 rounded w-32" /></td>
                                            <td className="p-4"><div className="h-4 bg-[#523728]/10 rounded w-12" /></td>
                                            <td className="p-4"><div className="h-6 bg-[#523728]/10 rounded-full w-20" /></td>
                                            <td className="p-4"><div className="h-4 bg-[#523728]/10 rounded w-24" /></td>
                                            <td className="p-4 flex gap-2"><div className="h-8 bg-[#523728]/10 rounded w-16" /><div className="h-8 bg-[#523728]/10 rounded w-20" /></td>
                                        </tr>
                                    ))
                                ) : orders.length > 0 ? (
                                    /* RENDER DATA ORDERS */
                                    orders.map((order: IOrder, index: number) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-[#523728]/5 border-b border-[#523728]/10 transition"
                                        >
                                            <td className="p-4">{(currentPage - 1) * 10 + (index + 1)}</td>
                                            <td className="p-4 font-medium">{order.customer_name}</td>
                                            <td className="p-4">{order.table_number}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    order.status === "PROCESSING"
                                                        ? "bg-amber-100 text-amber-700 border border-amber-200"
                                                        : "bg-green-100 text-green-700 border border-green-200"
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4 font-semibold">${order.total}</td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <Link to={`/orders/${order.id}`}>
                                                        <Button variant="transparan">
                                                            Detail
                                                        </Button>
                                                    </Link>

                                                    {order.status === "PROCESSING" && (
                                                        <Button
                                                            variant="coklat"
                                                            onClick={() => handleCompleteOrder(order.id)}
                                                        >
                                                            Completed
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* DATA EMPTY STATE */
                                    <tr>
                                        <td colSpan={6} className="text-center p-8 text-[#523728]/60 font-medium">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION CONTROLS */}
                {!isLoading && orders.length > 0 && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <Button
                            variant="transparan"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="disabled:opacity-40"
                        >
                            &laquo; Prev
                        </Button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "coklat" : "transparan"}
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}

                        <Button
                            variant="transparan"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="disabled:opacity-40"
                        >
                            Next &raquo;
                        </Button>
                    </div>
                )}

            </section>
        </main>
    );
};

export default ListOrder;