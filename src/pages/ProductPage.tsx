import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/Authcontext";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProductPage() {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const product = getProduct(Number(id));

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
          message: t("connecter_ajouter_panier")
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
      1
    );
    alert(`${product.name} ${t("ajoute_au_panier")}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-60">
        <ArrowLeft size={16} /> {t("retour")}
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <span className="text-sm text-neutral-500 uppercase tracking-wide">{product.category === "tissu" ? t("tissus") : t("sacs")}</span>
          <h1 className="text-3xl md:text-4xl font-light mt-2 mb-4">{product.name}</h1>
          <p className="text-neutral-600 mb-6">{product.description || t("description_defaut")}</p>
          <div className="text-3xl font-medium mb-8">{product.price.toLocaleString()} FCFA</div>
          {product.category === "tissu" && (
            <p className="text-sm text-neutral-500 mb-4">{t("prix_unitaire")}</p>
          )}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded-full hover:opacity-80 transition"
          >
            {t("ajouter_au_panier")}
          </button>
        </div>
      </div>
    </div>
  );
}