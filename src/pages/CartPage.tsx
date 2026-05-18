import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, AlertCircle, FileText } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../components/InvoicePDF";

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const livraison = 2000;
  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax + livraison;

  // Vérifier l'authentification
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/checkout", message: "Veuillez vous connecter pour commander" } });
    }
  }, [user, navigate]);

  if (!user) return null;

  // Panier vide
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto text-neutral-300 mb-4" />
        <h2 className="text-2xl font-light mb-2">Votre panier est vide</h2>
        <Link to="/shop" className="border-b border-black pb-0.5 text-sm uppercase hover:opacity-60">
          Découvrir la boutique
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    if (!name.trim()) { setError("Veuillez entrer votre nom"); return false; }
    if (!address.trim()) { setError("Veuillez entrer votre adresse de livraison"); return false; }
    if (!phone.trim()) { setError("Veuillez entrer votre numéro de téléphone"); return false; }
    if (phone.trim().length < 9) { setError("Numéro de téléphone invalide"); return false; }
    setError("");
    return true;
  };

  const handleOrder = async () => {
    if (!validateForm()) return;
    setLoading(true);
    
    // Simulation de commande
    setTimeout(() => {
      const fakeOrderId = "CMD-" + Date.now().toString().slice(-8);
      setOrderId(fakeOrderId);
      setOrderCompleted(true);
      clearCart();
      setLoading(false);
    }, 1500);
  };

  const orderData = { id: orderId, date: new Date().toISOString() };
  const customerData = { name, address, phone };
  const totalsData = { subtotal, livraison, tax, total };

  if (orderCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 rounded-2xl p-8 mb-6">
          <Heart className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-light mb-2">Commande confirmée !</h2>
          <p className="text-neutral-500 mb-4">Merci pour votre confiance. Vous recevrez votre commande sous 48h.</p>
          <p className="text-sm text-neutral-400">Référence : {orderId}</p>
        </div>

        <PDFDownloadLink
          document={<InvoicePDF order={orderData} customer={customerData} items={cart} totals={totalsData} />}
          fileName={`facture-${orderId}.pdf`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:opacity-80 transition mb-4"
        >
          <FileText size={18} />
          Télécharger la facture (PDF)
        </PDFDownloadLink>

        <div>
          <Link to="/shop" className="text-sm text-neutral-500 hover:text-black transition">
            ← Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-light mb-8 text-center">Finaliser la commande</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-xl p-6">
              <h2 className="font-medium text-lg mb-5">Informations de livraison</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom complet *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Adresse de livraison *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Votre adresse complète (Dakar, Sicap Liberté, ...)"
                  />
                  <p className="text-xs text-neutral-400 mt-1">📍 Livraison à Dakar et banlieue uniquement</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Numéro de téléphone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="+221 77 000 00 00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Récapitulatif */}
          <div>
            <div className="bg-neutral-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-medium text-lg mb-4">Récapitulatif</h3>
              
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-neutral-500 text-xs">
                        x{item.quantity} {item.category === "tissu" && "mètre(s)"}
                      </p>
                    </div>
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-neutral-500">Sous-total</span><span>{subtotal.toLocaleString()} FCFA</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">Livraison (Dakar)</span><span>{livraison.toLocaleString()} FCFA</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">TVA (18%)</span><span>{tax.toLocaleString()} FCFA</span></div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-base"><span>Total TTC</span><span className="text-xl">{total.toLocaleString()} FCFA</span></div>
                  <p className="text-xs text-neutral-400 mt-1">Livraison estimée : 24h-48h</p>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full mt-6 bg-black text-white py-3 rounded-full hover:opacity-80 transition flex items-center justify-center gap-2"
              >
                <Heart size={18} />
                {loading ? "Préparation..." : "Confirmer la commande"}
              </button>
              
              <p className="text-xs text-neutral-400 text-center mt-4">
                📱 La facture vous sera envoyée après confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
