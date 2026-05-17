import { useState, useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import { useAuth } from "../../contexts/Authcontext";
import { Plus, Edit, Trash2, Package, ShoppingBag, LogOut, Users, DollarSign, TrendingUp, Eye, Cookie } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  // Statistiques avancées
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [recentViews, setRecentViews] = useState<any[]>([]);
  const [cookieStats, setCookieStats] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  // Calcul des statistiques produits
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
  const tissusCount = products.filter(p => p.category === "tissu").length;
  const sacsCount = products.filter(p => p.category === "sac").length;

  // Charger les statistiques avancées
  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        // 1. Vues produits
        const { data: views } = await supabase
          .from('product_views')
          .select('product_name, viewed_at')
          .order('viewed_at', { ascending: false })
          .limit(20);
        setRecentViews(views || []);

        // 2. Top produits (agrégation manuelle)
        if (views && views.length > 0) {
          const productCount: { [key: string]: number } = {};
          views.forEach((v: any) => {
            productCount[v.product_name] = (productCount[v.product_name] || 0) + 1;
          });
          const sorted = Object.entries(productCount)
            .map(([name, count]) => ({ product_name: name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
          setTopProducts(sorted);
        }

        // 3. Cookies consentements
        const { data: cookies } = await supabase
          .from('cookie_consents')
          .select('consent_type, created_at, ip_address')
          .order('created_at', { ascending: false })
          .limit(10);
        setCookieStats(cookies || []);

        // 4. Utilisateurs (via Supabase Auth)
        const { data: { users } } = await supabase.auth.admin.listUsers();
        setUsersList(users || []);
        
      } catch (err) {
        console.error("Erreur chargement stats:", err);
      }
      setLoadingStats(false);
    };
    
    fetchStats();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm(t("confirmer_suppression"))) {
      deleteProduct(id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light">{t("administration")}</h1>
              <p className="text-sm text-neutral-500">
                {t("connecte_commme")} <span className="font-medium text-black">{user?.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-black text-white rounded-lg hover:opacity-80"
            >
              <LogOut size={16} /> {t("deconnexion")}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">{t("produits")}</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {tissusCount} {t("tissus")} / {sacsCount} {t("sacs")}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">{t("stock_total")}</p>
                <p className="text-2xl font-bold">{totalStock}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">{t("valeur_stock")}</p>
                <p className="text-xl font-bold">{totalValue.toLocaleString()} FCFA</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">{t("clients")}</p>
                <p className="text-2xl font-bold">{usersList.length}</p>
              </div>
              <Users className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Statistiques avancées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Produits les plus consultés */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-orange-500" />
              <h3 className="font-medium">🔥 Produits les plus consultés</h3>
            </div>
            {loadingStats ? (
              <p className="text-neutral-400 text-sm text-center py-4">Chargement...</p>
            ) : topProducts.length === 0 ? (
              <p className="text-neutral-400 text-sm text-center py-4">Aucune donnée pour le moment</p>
            ) : (
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-neutral-500">#{i+1}</span>
                      <span className="text-sm">{p.product_name}</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{p.count} vues</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dernières activités / vues */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={20} className="text-green-500" />
              <h3 className="font-medium">👁️ Derniers produits consultés</h3>
            </div>
            {loadingStats ? (
              <p className="text-neutral-400 text-sm text-center py-4">Chargement...</p>
            ) : recentViews.length === 0 ? (
              <p className="text-neutral-400 text-sm text-center py-4">Aucune activité récente</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentViews.map((view, i) => (
                  <div key={i} className="text-sm text-neutral-600 border-b pb-1">
                    <span className="font-medium">{view.product_name}</span>
                    <span className="text-xs text-neutral-400 ml-2">
                      {new Date(view.viewed_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cookies consentements */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Cookie size={20} className="text-neutral-500" />
              <h2 className="text-lg font-light">🍪 Consentements cookies récents</h2>
            </div>
            <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded-full">
              {cookieStats.length} enregistrements
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs uppercase tracking-wider">
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Adresse IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cookieStats.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-neutral-400">Aucun consentement enregistré</td></tr>
                ) : (
                  cookieStats.map((c, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm">{new Date(c.created_at).toLocaleString()}</td>
                      <td className="px-6 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          c.consent_type === "accepted" ? "bg-green-100 text-green-700" :
                          c.consent_type === "essential" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                        }`}>
                          {c.consent_type === "accepted" ? "Accepté" : c.consent_type === "essential" ? "Essentiels" : "Refusé"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-xs text-neutral-500">{c.ip_address || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bouton Ajouter */}
        <div className="mb-6">
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:opacity-80"
          >
            <Plus size={18} /> {t("ajouter_produit")}
          </button>
        </div>

        {/* Tableau des produits */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-sm">
                  <th className="px-4 py-3">{t("image")}</th>
                  <th className="px-4 py-3">{t("nom")}</th>
                  <th className="px-4 py-3">{t("categorie")}</th>
                  <th className="px-4 py-3">{t("prix")}</th>
                  <th className="px-4 py-3">{t("stock")}</th>
                  <th className="px-4 py-3">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-neutral-400">{t("aucun_produit_admin")}</td></tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3"><img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" /></td>
                      <td className="px-4 py-3 font-medium text-sm">{product.name}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${product.category === "tissu" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                          {product.category === "tissu" ? t("tissu") : t("sac")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{product.price.toLocaleString()} FCFA</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm ${(product.stock || 0) < 10 ? "text-red-500 font-medium" : "text-neutral-600"}`}>
                          {product.stock || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingProduct(product); setShowModal(true); }} className="text-neutral-500 hover:text-black"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(product.id)} className="text-neutral-500 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Ajout/Modification */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Composant Modal
function ProductModal({ product, onClose }: { product?: any; onClose: () => void }) {
  const { addProduct, updateProduct } = useProducts();
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "tissu",
    stock: product?.stock || 10,
    featured: product?.featured || false,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price as any),
      stock: parseInt(formData.stock as any),
      image: imagePreview || "https://images.unsplash.com/photo-1605283176568-9b41fde3672e?w=400",
    };
    if (product) {
      updateProduct(product.id, data);
    } else {
      addProduct(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-light mb-6">{product ? t("modifier_produit") : t("ajouter_produit")}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium mb-1">{t("nom_produit")}</label><input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">{t("description_produit")}</label><textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">{t("prix_fcfa")}</label><input type="number" step="1" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">{t("stock")}</label><input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-1">{t("categorie")}</label><select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as "tissu" | "sac"})} className="w-full px-4 py-2 border rounded-lg"><option value="tissu">{t("tissu")}</option><option value="sac">{t("sac")}</option></select></div>
            <div><label className="block text-sm font-medium mb-1">{t("image_produit")}</label><input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-lg" />{imagePreview && <img src={imagePreview} alt="preview" className="mt-2 w-32 h-32 object-cover rounded" />}</div>
            <label className="flex items-center gap-2"><input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} /><span className="text-sm">{t("en_vedette")}</span></label>
            <div className="flex gap-3 pt-4"><button type="submit" className="flex-1 bg-black text-white py-2 rounded-lg">{product ? t("mettre_a_jour") : t("ajouter")}</button><button type="button" onClick={onClose} className="flex-1 border py-2 rounded-lg">{t("annuler")}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}