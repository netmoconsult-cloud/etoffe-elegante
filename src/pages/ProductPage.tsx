import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/Authcontext";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [productViewed, setProductViewed] = useState(false);

  const product = products.find(p => p.id === Number(id));

  useEffect(() => {
    if (product && !productViewed) {
      const saveProductView = async () => {
        try {
          await supabase.from("product_views").insert([
            {
              product_id: product.id,
              product_name: product.name,
              user_id: user?.id || null,
              viewed_at: new Date().toISOString()
            }
          ]);
        } catch (err) {
          console.error("Erreur enregistrement vue:", err);
        }
      };
      saveProductView();
      setProductViewed(true);
    }
  }, [product, user, productViewed]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-400">{t("aucun_produit")}</p>
        <Link to="/shop" className="inline-block mt-4 border-b border-black">{t("retour")}</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { 
        state: { 
          from: `/product/${product.id}`, 
          message: "Veuillez vous connecter pour ajouter au panier"
        } 
      });
      return;
    }
    
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      },
      quantity
    );
    
    // Notification toast élégante
    toast.success(`${product.name} ajouté au panier !`, {
      duration: 3000,
      position: "top-right",
      icon: "🛒",
      style: {
        background: "#1a2a3a",
        color: "#fff",
        borderRadius: "12px",
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm mb-6 sm:mb-8 hover:opacity-60">
        <ArrowLeft size={16} /> {t("retour")}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
        <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <span className="text-sm text-neutral-500 uppercase tracking-wide">
            {product.category === "tissu" ? t("tissus") : t("sacs")}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mt-2 mb-4">{product.name}</h1>
          
          <div className="prose prose-sm text-neutral-600 mb-6">
            <p>{product.description || t("description_defaut")}</p>
          </div>

          <div className="border-t border-b py-4 mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Disponibilité :</span>
              <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                {product.stock > 0 ? `En stock (${product.stock} unités)` : "Rupture de stock"}
              </span>
            </div>
            {product.category === "tissu" && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Unité :</span>
                <span className="font-medium">Prix au mètre</span>
              </div>
            )}
          </div>

          <div className="text-2xl sm:text-3xl font-medium mb-4">
            {product.price.toLocaleString()} FCFA
            {product.category === "tissu" && <span className="text-sm text-neutral-500 ml-2">/ mètre</span>}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-neutral-500">Quantité :</span>
            <div className="flex items-center border rounded-full">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-100 rounded-l-full"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              {product.category === "tissu" && <span className="text-xs text-neutral-400">m</span>}
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 hover:bg-gray-100 rounded-r-full"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-full transition flex items-center justify-center gap-2 ${
              product.stock > 0 
                ? "bg-black text-white hover:opacity-80" 
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
          >
            <Heart size={18} />
            {product.stock > 0 ? t("ajouter_au_panier") : "Indisponible"}
          </button>

          <div className="mt-8 p-4 bg-neutral-50 rounded-xl">
            <h4 className="font-medium mb-3">Informations de livraison</h4>
            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex items-center gap-2"><Truck size={16} /> Livraison à Dakar : 2000 FCFA</div>
              <div className="flex items-center gap-2"><Shield size={16} /> Paiement sécurisé (Wave, Orange Money)</div>
              <div className="flex items-center gap-2"><RefreshCw size={16} /> Retour sous 14 jours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
