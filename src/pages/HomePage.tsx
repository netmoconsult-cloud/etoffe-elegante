import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/Authcontext";

export default function HomePage() {
  const { products } = useProducts();
  const { t } = useLanguage();
  const { user } = useAuth();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || "Invité";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bonjour" : currentHour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div>
      {/* Message de bienvenue personnalisé - Version élégante */}
      {user && (
        <div className="bg-white/80 backdrop-blur-sm py-3 text-center border-b border-neutral-100">
          <p className="text-neutral-400 text-xs uppercase tracking-wide">
            Bon retour parmi nous
          </p>
          <p className="text-neutral-700 text-sm mt-0.5">
            <span className="font-medium text-black">{userName}</span>
            <span className="text-neutral-400"> — Que souhaitez-vous découvrir aujourd'hui ?</span>
          </p>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            {t("hero_title")}
          </h1>
          <p className="text-neutral-500 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            {t("hero_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/shop?category=tissu" className="border-b border-black pb-0.5 text-xs sm:text-sm uppercase tracking-wide hover:opacity-60">
              {t("voir_tissus")}
            </Link>
            <Link to="/shop?category=sac" className="border-b border-black pb-0.5 text-xs sm:text-sm uppercase tracking-wide hover:opacity-60">
              {t("voir_sacs")}
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="bg-neutral-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-light text-center mb-8 sm:mb-10">
            {t("produits_populaires")}
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <p className="text-center text-neutral-400 text-sm sm:text-base">{t("aucun_produit")}</p>
          )}
        </div>
      </div>

      {/* WhatsApp */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <a href="https://wa.me/221771418282" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">{t("whatsapp")}</span>
        </a>
      </div>
    </div>
  );
}