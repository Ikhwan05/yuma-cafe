import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import type { ICart, IMenu } from "../../types/order";
import { getMenus } from "../../services/menu.service";
import { filters, tableNumber } from "./CreateOrder.constants";
import Button from "../../components/ui/Button";
import type { FormEvent } from "react";
import { createOrder } from "../../services/order.service";

const CreateOrder = () => {
    const [menus, setMenus] = useState<IMenu[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [carts, setCarts] = useState<ICart[]>([]);
    
    // State Tambahan untuk Loading dan Pagination Meta
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    

    // Ambil parameter dari URL search params
    const currentCategory = searchParams.get('category') || '';
    const currentPage = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        const fetchMenu = async () => {
            setIsLoading(true);
            try {
                const result = await getMenus(currentCategory, currentPage);
                setMenus(result.data || []);
                
                
                if (result.metadata?.totalPages !== undefined) {
                    // Mengambil langsung angka totalPages (misal: 5 atau 1) dari objek metadata
                    setTotalPages(result.metadata.totalPages);
                } else if (result.metadata?.total !== undefined) {
                    // Jika totalPages absen tapi ada total item, kita hitung manual
                    const calcPages = Math.ceil(result.metadata.total / 6);
                    setTotalPages(calcPages || 1);
                } else {
                    // Fallback jika kategori tersebut tidak punya metadata sama sekali
                    setTotalPages(1);
                }
                // ------------------------------------------

            } catch (error) {
                console.error("Failed to fetch menu:", error);
                setTotalPages(1);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenu();
    }, [currentCategory, currentPage]);

    const handleAddToCart = (type: 'increment' | 'decrement', menuItem: IMenu | string) => {
        const menuItemId = typeof menuItem === 'string' ? menuItem : menuItem.id;
        const itemIsInCart = carts.find((item: ICart) => item.menuItemId === menuItemId);
        
        if (type === 'increment') {
            if (itemIsInCart) {
                setCarts(
                    carts.map((item: ICart) =>
                        item.menuItemId === menuItemId ? { ...item, quantity: item.quantity + 1 } : item
                    )
                );
            } else if (typeof menuItem !== 'string') {
                setCarts([...carts, { menuItemId, quantity: 1, notes: '', menuItem }]);
            }
        } else {
            if (itemIsInCart && itemIsInCart.quantity <= 1) {
                setCarts(carts.filter((item: ICart) => item.menuItemId !== menuItemId));
            } else {
                setCarts(
                    carts.map((item: ICart) =>
                        item.menuItemId === menuItemId ? { ...item, quantity: item.quantity - 1 } : item
                    )
                );
            }
        }
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    };

    const handleFilterChange = (filter: string) => {
        const params = new URLSearchParams();
        if (filter !== "All") {
            params.set('category', filter);
        }
        params.set('page', '1'); // Reset ke halaman 1 setiap ganti kategori
        setSearchParams(params);
    };

    const handleOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const payload = {
            customerName: form.customerName.value,
            tableNumber: form.tableNumber.value,
            cart: carts.map((item: ICart) => ({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                notes: '',
            })),
        };
        await createOrder(payload);
        window.location.href = '/orders';
    };

    return (
        <main className="min-h-screen bg-amber-50 p-4 md:p-8 text-[#523728]">
            <section className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="font-bold text-2xl md:text-3xl text-[#523728]">Explore Our Best Menu</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                    
                    {/* LEFTPART: MENU SECTION */}
                    <div>
                        {/* Kategori Filter */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {filters.map((filter) => (
                                <Button
                                    key={filter}
                                    variant={
                                        (!searchParams.get("category") && filter === "All") ||
                                        filter === searchParams.get("category")
                                            ? "coklat"
                                            : "transparan"
                                    }
                                    onClick={() => handleFilterChange(filter)}
                                >
                                    {filter}
                                </Button>
                            ))}
                        </div>

                        {/* Menu Grid / Loading Animation */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-amber-100/70 rounded-xl overflow-hidden shadow-sm border border-amber-200/50 animate-pulse">
                                        <div className="h-48 w-full bg-amber-200/60" />
                                        <div className="p-4 space-y-4">
                                            <div className="h-5 bg-amber-200/60 rounded w-2/3" />
                                            <div className="flex justify-between items-center pt-2">
                                                <div className="h-5 bg-amber-200/60 rounded w-1/4" />
                                                <div className="h-9 bg-amber-200/60 rounded w-1/3" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {menus.map((item: IMenu) => (
                                    <div
                                        key={item.id}
                                        className="bg-amber-100/60 rounded-xl overflow-hidden shadow-sm border border-amber-200/60 hover:shadow-md transition-shadow"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="h-48 w-full object-cover mix-blend-multiply bg-amber-100"
                                        />
                                        <div className="p-4">
                                            <h2 className="font-bold text-lg text-[#523728]">{item.name}</h2>
                                            <div className="flex justify-between items-center mt-4">
                                                <p className="font-bold text-[#523728]">${item.price}</p>
                                                <Button
                                                    variant="coklat"
                                                    onClick={() => handleAddToCart("increment", item)}
                                                >
                                                    Add To Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {/* Jika total halaman hanya 1 atau kurang, elemen di bawah ini otomatis tersembunyi */}
                        {!isLoading && menus.length > 0 && totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8 mb-6">
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
                    </div>

                    {/* RIGHTPART: FORM & CART SECTION */}
                    <form
                        onSubmit={handleOrder}
                        className="bg-amber-100/60 border border-amber-200/70 rounded-xl shadow-sm p-5 h-fit lg:sticky lg:top-5"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="font-bold text-xl text-[#523728]">Customer Info</h2>
                                <Link to="/orders">
                                    <Button variant="transparan" type="button">Cancel</Button>
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-[#523728]">Name</label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        placeholder="Insert Name"
                                        className="w-full px-3 py-2 rounded-lg bg-amber-50/80 border border-amber-200 text-[#523728] placeholder-amber-700/40 focus:outline-none focus:ring-2 focus:ring-[#523728]/20 focus:border-[#523728]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-[#523728]">Table Number</label>
                                    <select
                                        name="tableNumber"
                                        id="table"
                                        className="w-full px-3 py-2 rounded-lg bg-amber-50/80 border border-amber-200 text-[#523728] focus:outline-none focus:ring-2 focus:ring-[#523728]/20 focus:border-[#523728]"
                                    >
                                        {tableNumber.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="font-bold text-xl mb-4 text-[#523728]">Current Order</h2>
                            {carts.length > 0 ? (
                                <div className="space-y-4">
                                    {carts.map((item) => (
                                        <div key={item.menuItem.id} className="flex justify-between items-center bg-amber-50/40 p-2 rounded-lg border border-amber-200/30">
                                            <h4 className="font-medium text-sm max-w-[150px] truncate">{item.menuItem.name}</h4>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    type="button"
                                                    variant="transparan"
                                                    className="px-2 py-1 min-h-0 h-7"
                                                    onClick={() => handleAddToCart("decrement", item.menuItemId)}
                                                >
                                                    -
                                                </Button>
                                                <div className="w-6 text-center font-semibold text-sm">
                                                    {item.quantity}
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="transparan"
                                                    className="px-2 py-1 min-h-0 h-7"
                                                    onClick={() => handleAddToCart("increment", item.menuItemId)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="submit"
                                        variant="coklat"
                                    >
                                        Order Now
                                    </Button>
                                </div>
                            ) : (
                                <div className="border border-dashed border-amber-300 rounded-lg p-6 text-center text-amber-800/60 bg-amber-50/30">
                                    Cart is empty
                                </div>
                            )}
                        </div>
                    </form>

                </div>
            </section>
        </main>
    );
};

export default CreateOrder;