import { map } from 'nanostores';

export type CartItem = {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

export const $cart = map<Record<string, CartItem>>({});

export function addCartItem({ id, name, image, price }: { id: string; name: string; image: string; price: number; }) {
    const existingEntry = $cart.get()[id];
    if (existingEntry) {
        $cart.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity + 1,
        });
    } else {
        $cart.setKey(id, { id, name, image, price, quantity: 1 });
    }
}

export function removeCartItem(id: string) {
    // Hapus item dari map dengan cara set nilainya ke undefined
    $cart.setKey(id, undefined);
}

export function updateItemQuantity(id: string, newQuantity: number) {
    const existingEntry = $cart.get()[id];
    if (existingEntry) {
        if (newQuantity > 0) {
            $cart.setKey(id, {
                ...existingEntry,
                quantity: newQuantity,
            });
        } else {
            // Jika quantity 0 atau kurang, hapus item
            removeCartItem(id);
        }
    }
}