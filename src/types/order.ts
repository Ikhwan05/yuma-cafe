interface IMenu {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    is_available: boolean;
}

interface ICart {
    menuItemId: string;
    quantity: number;
    notes: string;
    menuItem: IMenu;
}

interface IOrder {
    id: string;
    customer_name: string;
    table_number: string;
    cart: ICart[];
    status: 'PENDING' | 'PROCESSING' | 'COMPLETE';
    total: number;
}

export type {IOrder, ICart, IMenu}