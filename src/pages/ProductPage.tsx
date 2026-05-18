import { useParams, Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProductPage() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { t } = useLanguage();

  const productId = Number(id);
  const product = products.find(p => p.id === productId);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500">Chargement...</p>
      </div>
    );
  }

  if (!product || isNaN(productId)) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500 mb-4">
          {t("aucun_produit") || "Produit non trouvé"}
        </p>
        <p className="text-sm text-neutral-400 mb-6">
          ID demandé: {id} | {products.length} produit(s) disponible(s)
        </p>
        <Link to="/shop" className="border-b border-black pb-0.5">
          {t("retour") || "Retour à la boutique"}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-60">
        ← {t("retour") || "Retour"}
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-neutral-100 rounded-2xl overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-light mb-4">{product.name}</h1>
          <p className="text-neutral-600 mb-6">
            {product.description || "Découvrez ce produit d'exception."}
          </p>
          <div className="text-3xl font-medium mb-8">
            {product.price.toLocaleString()} FCFA
          </div>
          <button 
            className="w-full bg-black text-white py-3 rounded-full hover:opacity-80 transition"
            onClick={() => alert("Ajout au panier")}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
