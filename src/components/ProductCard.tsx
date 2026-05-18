import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/Authcontext";
import { useLanguage } from "../contexts/LanguageContext";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate("/login", { 
        state: { 
          from: `/product/${product.id}`, 
          message: "Veuillez vous connecter pour ajouter au panier" 
        } 
      });
      return;
    }
    
    addToCart({ ...product, quantity: 0 }, 1);
    
    toast.success(`${product.name} ${t("ajoute_au_panier")}`, {
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
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 xs:h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500" 
        />
        <div className="p-3 sm:p-4">
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h3>
          <p className="text-neutral-500 text-xs sm:text-sm mt-1">
            {product.price.toLocaleString()} FCFA
          </p>
          {product.category === "tissu" && (
            <p className="text-xs text-neutral-400 mt-0.5">📏 Prix au mètre</p>
          )}
          <button 
            onClick={handleAddToCart}
            className="mt-2 sm:mt-3 w-full border border-black py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-black hover:text-white transition"
          >
            {t("ajouter_au_panier")}
          </button>
        </div>
      </div>
    </Link>
  );
}
