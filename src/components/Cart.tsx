import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $cart, updateItemQuantity, removeCartItem } from '../stores/cart';

export default function Cart() {
    const cart = useStore($cart);
    const [isOpen, setIsOpen] = useState(false);

    const subtotal = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        const myPhoneNumber = '6281234567890'; // GANTI DENGAN NOMOR WA-MU

        let message = `Halo, saya mau order pempek:\n\n`;
        Object.values(cart).forEach(item => {
            message += `${item.name} (x${item.quantity}) - Rp ${item.price * item.quantity}\n`;
        });
        message += `\n*Subtotal: Rp ${subtotal}*`;
        message += `\n\n(Mohon jangan ubah pesan ini agar pesanan cepat diproses)`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${myPhoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <>
            {/* Floating Cart Button */}
            <div className="fixed bottom-5 right-5 z-50">
                <button onClick={() => setIsOpen(true)} className="bg-primary text-background font-bold rounded-full p-4 shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </button>
            </div>

            {/* Cart Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-background shadow-2xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full text-text-main">
                    <div className="flex justify-between items-center p-4 border-b border-surface">
                        <h2 className="text-xl font-bold">Keranjang Anda</h2>
                        <button onClick={() => setIsOpen(false)} className="text-text-main/60 hover:text-text-main">&times;</button>
                    </div>

                    <div className="flex-grow p-4 overflow-y-auto">
                        {Object.keys(cart).length === 0 ? (
                            <p className="text-text-main/60">Keranjang masih kosong.</p>
                        ) : (
                            Object.values(cart).map(item => (
                                <div key={item.id} className="flex items-center space-x-4 mb-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                                    <div className="flex-grow">
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-sm text-primary">Rp {item.price}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="px-2 border border-surface rounded">-</button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="px-2 border border-surface rounded">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeCartItem(item.id)} className="text-red-500 hover:text-red-400 p-1 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t border-surface">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Subtotal</span>
                            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                        </div>
                        <button onClick={handleCheckout} disabled={Object.keys(cart).length === 0} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded disabled:bg-surface disabled:cursor-not-allowed">
                            Checkout via WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}