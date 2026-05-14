import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, AlertCircle } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const livraison = 2000;
  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax + livraison;

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/checkout", message: t("connecter_commander") } });
    }
  }, [user, navigate, t]);

  if (!user) return null;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto text-neutral-300 mb-4" />
        <h2 className="text-2xl font-light mb-2">{t("vide")}</h2>
        <Link to="/shop" className="border-b border-black pb-0.5 text-sm uppercase hover:opacity-60">
          {t("decouvrir_boutique")}
        </Link>
      </div>
    );
  }

  const getFormattedDateTime = () => {
    const now = new Date();
    const jours = [t("dimanche"), t("lundi"), t("mardi"), t("mercredi"), t("jeudi"), t("vendredi"), t("samedi")];
    const mois = [t("janvier"), t("fevrier"), t("mars"), t("avril"), t("mai"), t("juin"), t("juillet"), t("aout"), t("septembre"), t("octobre"), t("novembre"), t("decembre")];
    
    const jourSemaine = jours[now.getDay()];
    const jour = now.getDate();
    const moisNom = mois[now.getMonth()];
    const annee = now.getFullYear();
    const heures = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${jourSemaine} ${jour} ${moisNom} ${annee} ${t("a")} ${heures}h${minutes}`;
  };

  const generateWhatsAppMessage = () => {
    const dateTime = getFormattedDateTime();
    
    let message = "";
    
    message += `${t("nouvelle_commande")}\n`;
    message += `${t("date")} : ${dateTime}\n`;
    message += "-----------------------------------\n\n";
    
    cart.forEach((item) => {
      message += `${item.name}\n`;
      message += `   ${item.quantity} x ${item.price.toLocaleString()} FCFA = ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
      if (item.category === "tissu") message += `   (${item.quantity} ${t("metre_s")})\n`;
    });
    
    message += "\n-----------------------------------\n";
    message += `${t("sous_total")} : ${subtotal.toLocaleString()} FCFA\n`;
    message += `${t("livraison")} : ${livraison.toLocaleString()} FCFA\n`;
    message += `TVA : ${tax.toLocaleString()} FCFA\n`;
    message += `${t("total")} : ${total.toLocaleString()} FCFA\n\n`;
    
    message += "-----------------------------------\n";
    message += `${t("client")} : ${name || "-"}\n`;
    message += `${t("tel")} : ${phone || "-"}\n`;
    message += `${t("adresse")} : ${address || "-"}\n\n`;
    
    message += "-----------------------------------\n";
    message += `${t("merci_confirmer")}\n`;
    message += "ETOFFE ELEGANTE";
    
    return encodeURIComponent(message);
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError(t("erreur_nom"));
      return false;
    }
    if (!address.trim()) {
      setError(t("erreur_adresse"));
      return false;
    }
    if (!phone.trim()) {
      setError(t("erreur_telephone"));
      return false;
    }
    if (phone.trim().length < 9) {
      setError(t("erreur_telephone_invalide"));
      return false;
    }
    setError("");
    return true;
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const whatsappNumber = "221771418282";
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("Erreur:", err);
      setError(t("erreur_whatsapp"));
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-light mb-8 text-center">{t("finaliser_commande")}</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-xl p-6">
              <h2 className="font-medium text-lg mb-5">{t("informations_livraison")}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t("nom_complet")} *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder={t("votre_nom")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("adresse_livraison")} *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder={t("adresse_exemple")}
                  />
                  <p className="text-xs text-neutral-400 mt-1">📍 {t("livraison_dakar")}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("telephone")} *</label>
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

          <div>
            <div className="bg-neutral-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-medium text-lg mb-4">{t("recapitulatif")}</h3>
              
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-neutral-500 text-xs">
                        x{item.quantity} {item.category === "tissu" && t("metre_s")}
                      </p>
                    </div>
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{t("sous_total")}</span>
                  <span>{subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{t("livraison")} (Dakar)</span>
                  <span>{livraison.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">TVA (18%)</span>
                  <span>{tax.toLocaleString()} FCFA</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-base">
                    <span>{t("total_ttc")}</span>
                    <span className="text-xl">{total.toLocaleString()} FCFA</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{t("livraison_estimee")}</p>
                </div>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                disabled={loading}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <Heart size={18} />
                {loading ? t("preparation") : t("commander_whatsapp")}
              </button>
              
              <p className="text-xs text-neutral-400 text-center mt-4">
                {t("redirection_whatsapp")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}