import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function HomePage() {
  const { products } = useProducts();
  const { t } = useLanguage();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            {t("hero_title")}
          </h1>
          <p className="text-neutral-500 text-lg mb-8 max-w-2xl mx-auto">
            {t("hero_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop?category=tissu"
              className="border-b border-black pb-0.5 text-sm uppercase tracking-wide hover:opacity-60"
            >
              {t("voir_tissus")}
            </Link>
            <Link
              to="/shop?category=sac"
              className="border-b border-black pb-0.5 text-sm uppercase tracking-wide hover:opacity-60"
            >
              {t("voir_sacs")}
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-light text-center mb-10">
            {t("produits_populaires")}
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-400">{t("aucun_produit")}</p>
          )}
        </div>
      </div>

      {/* WhatsApp - traduit */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <a
          href="https://wa.me/221771418282"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm">{t("whatsapp")}</span>
        </a>
      </div>
    </div>
  );
}