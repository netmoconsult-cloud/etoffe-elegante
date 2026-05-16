import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/Authcontext";
import { useLanguage } from "../contexts/LanguageContext";

export default function CartPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { t } = useLanguage();

  // Vérification d'authentification
  useEffect(() => {
    if (!user) {
      navigate("/login", { 
        state: { 
          from: "/cart", 
          message: "Veuillez vous connecter pour voir votre panier" 
        } 
      });
    }
  }, [user, navigate]);

  if (!user) return null;

  const livraison = 2000; // Frais de livraison à Dakar
  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax + livraison;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <ShoppingBag className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-neutral-300 mb-4" />
        <h2 className="text-xl sm:text-2xl font-light mb-2">{t("vide")}</h2>
        <p className="text-neutral-500 text-sm sm:text-base mb-6">{t("decouvrir_boutique")}</p>
        <Link 
          to="/shop" 
          className="border-b border-black pb-0.5 text-xs sm:text-sm uppercase hover:opacity-60"
        >
          {t("decouvrir_boutique")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8">{t("mon_panier")} ({cart.length} article{cart.length > 1 ? 's' : ''})</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Liste des produits - tableau responsive avec scroll horizontal sur mobile */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[600px] sm:min-w-full w-full">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-left text-xs sm:text-sm">
                    <th className="px-4 sm:px-6 py-3 sm:py-4">{t("produit")}</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4">{t("prix")}</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4">{t("quantite")}</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4">{t("total")}</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                          <div>
                            <span className="font-medium text-sm sm:text-base">{item.name}</span>
                            {item.category === "tissu" && (
                              <p className="text-xs text-neutral-400 mt-0.5">📏 {t("prix_unitaire")}</p>
                            )}
                          </div>
                        </div>
                       </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">{item.price.toLocaleString()} FCFA</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            className="p-1 rounded-md hover:bg-gray-100 transition"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-8 sm:w-12 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                          {item.category === "tissu" && (
                            <span className="text-xs text-neutral-400 ml-0 sm:ml-1">m</span>
                          )}
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="p-1 rounded-md hover:bg-gray-100 transition"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                       </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base">{(item.price * item.quantity).toLocaleString()} FCFA</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-red-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
            <button 
              onClick={clearCart} 
              className="text-red-400 hover:text-red-600 text-xs sm:text-sm transition flex items-center gap-1 order-2 sm:order-1"
            >
              <Trash2 size={14} /> {t("vider_panier")}
            </button>
            <Link 
              to="/shop" 
              className="text-xs sm:text-sm text-neutral-500 hover:text-black transition flex items-center gap-1 order-1 sm:order-2"
            >
              ← {t("continuer_achats")}
            </Link>
          </div>
        </div>

        {/* Résumé de la commande - carte sticky sur desktop */}
        <div className="lg:w-96">
          <div className="bg-neutral-50 rounded-xl p-4 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-lg sm:text-xl font-light mb-4">{t("recapitulatif")}</h2>
            
            <div className="space-y-2 sm:space-y-3 mb-4">
              <div className="flex justify-between text-neutral-600 text-sm sm:text-base">
                <span>{t("sous_total")}</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-neutral-600 text-sm sm:text-base">
                <span>TVA (18%)</span>
                <span>{tax.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Truck size={16} />
                  <span>{t("livraison")} (Dakar)</span>
                </div>
                <span>{livraison.toLocaleString()} FCFA</span>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold text-base sm:text-lg">
                  <span>{t("total_ttc")}</span>
                  <span className="text-lg sm:text-xl">{total.toLocaleString()} FCFA</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  {t("livraison_estimee")}
                </p>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="block w-full bg-black text-white text-center py-2.5 sm:py-3 rounded-full hover:bg-gray-800 transition font-medium text-sm sm:text-base"
            >
              {t("commander")}
            </Link>
            
            <div className="mt-4 text-center text-xs text-neutral-400">
              <p>🔒 {t("paiement_securise")}</p>
              <p className="mt-1">📍 {t("livraison_dakar")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
