import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category");
  const { products, loading } = useProducts();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<"all" | "tissu" | "sac">("all");

  useEffect(() => {
    if (categoryParam === "tissu") setActiveCategory("tissu");
    else if (categoryParam === "sac") setActiveCategory("sac");
    else setActiveCategory("all");
  }, [categoryParam]);

  // Filtrage par catégorie ET par recherche
  const filtered = products.filter(p => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const tissusCount = products.filter(p => p.category === "tissu").length;
  const sacsCount = products.filter(p => p.category === "sac").length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500">{t("chargement")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light">{t("nos_collections")}</h1>
        <div className="flex justify-center gap-8 mt-6">
          <button onClick={() => setActiveCategory("all")} className={`pb-2 text-sm uppercase tracking-wide ${activeCategory === "all" ? "border-b-2 border-black" : "text-neutral-400"}`}>
            {t("tous")} ({products.length})
          </button>
          <button onClick={() => setActiveCategory("tissu")} className={`pb-2 text-sm uppercase tracking-wide ${activeCategory === "tissu" ? "border-b-2 border-black" : "text-neutral-400"}`}>
            {t("tissus")} ({tissusCount})
          </button>
          <button onClick={() => setActiveCategory("sac")} className={`pb-2 text-sm uppercase tracking-wide ${activeCategory === "sac" ? "border-b-2 border-black" : "text-neutral-400"}`}>
            {t("sacs")} ({sacsCount})
          </button>
        </div>

        {searchQuery && (
          <p className="text-neutral-500 text-sm mt-4">
            {t("resultats_pour")} : <span className="font-medium">"{searchQuery}"</span> ({filtered.length} {t("produit")}{filtered.length > 1 ? "s" : ""})
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-neutral-400">{t("aucun_produit_trouve")}</p>
          {products.length === 0 && (
            <p className="text-sm text-neutral-400 mt-2">
              {t("aucun_produit_base")}
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}