import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

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
    alert(`${product.name} ${t("ajoute_au_panier")}`);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" 
        />
        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-neutral-500 text-sm mt-1">{product.price.toLocaleString()} FCFA</p>
          {product.category === "tissu" && (
            <p className="text-xs text-neutral-400 mt-0.5">📏 Prix au mètre</p>
          )}
          <button 
            onClick={handleAddToCart}
            className="mt-3 w-full border border-black py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
          >
            {t("ajouter_au_panier")}
          </button>
        </div>
      </div>
    </Link>
  );
}