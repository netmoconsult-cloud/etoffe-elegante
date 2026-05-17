import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, Search, Globe } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/Authcontext";  
import { useLanguage, Language } from "../contexts/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { getCartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  // Récupérer le nom de l'utilisateur
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || "Invité";

  // Liste des langues disponibles
  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ];

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl tracking-wide font-light">
            ÉTOFFE ÉLÉGANTE
          </Link>

          {/* Barre de recherche desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center border rounded-full px-4 py-1 w-64">
            <input
              type="text"
              placeholder={t("recherche")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
            <button type="submit">
              <Search size={18} className="text-neutral-400" />
            </button>
          </form>

          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide">
            <Link to="/shop?category=tissu">{t("tissus")}</Link>
            <Link to="/shop?category=sac">{t("sacs")}</Link>
            <Link to="/shop">{t("nouveautes")}</Link>
            <Link to="/about">{t("apropos")}</Link>
            {isAdmin && <Link to="/admin">{t("admin")}</Link>}
          </nav>

          <div className="flex items-center gap-4">
            {/* Sélecteur de langue avec drapeau */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm hover:opacity-60">
                <Globe size={16} />
                <span className="hidden md:inline">{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
              </button>
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as Language)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${
                      language === lang.code ? "bg-gray-50 text-black" : "text-gray-600"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Zone utilisateur connecté avec message de bienvenue */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 hidden md:inline">Bonjour,</span>
                <span className="text-sm font-medium text-black hidden md:inline">{userName}</span>
                <button onClick={logout} className="hover:opacity-60 text-sm ml-2">
                  {t("deconnexion")}
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:opacity-60">
                <User size={18} />
              </Link>
            )}

            <Link to="/cart" className="relative hover:opacity-60">
              <ShoppingBag size={18} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-3 text-[10px] bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 text-sm">
            <form onSubmit={handleSearch} className="flex items-center border rounded-full px-4 py-2 mb-3">
              <input
                type="text"
                placeholder={t("recherche")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none"
              />
              <button type="submit"><Search size={18} /></button>
            </form>
            
            <Link to="/shop?category=tissu" className="block" onClick={() => setIsOpen(false)}>{t("tissus")}</Link>
            <Link to="/shop?category=sac" className="block" onClick={() => setIsOpen(false)}>{t("sacs")}</Link>
            <Link to="/shop" className="block" onClick={() => setIsOpen(false)}>{t("nouveautes")}</Link>
            <Link to="/about" className="block" onClick={() => setIsOpen(false)}>{t("apropos")}</Link>
            {isAdmin && <Link to="/admin" className="block" onClick={() => setIsOpen(false)}>{t("admin")}</Link>}
            
            {/* Sélecteur de langue mobile */}
            <div className="border-t pt-3 mt-2">
              <p className="text-xs text-neutral-400 mb-2">Langue / Language</p>
              <div className="grid grid-cols-2 gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setIsOpen(false);
                    }}
                    className={`text-left px-2 py-1 text-sm rounded ${
                      language === lang.code ? "bg-black text-white" : "text-gray-600"
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Message de bienvenue mobile */}
            {user && (
              <div className="border-t pt-3 mt-2">
                <p className="text-sm text-neutral-600">
                  👋 Bonjour, <span className="font-medium text-black">{userName}</span>
                </p>
              </div>
            )}
            
            {user && (
              <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left">
                {t("deconnexion")}
              </button>
            )}
            {!user && (
              <>
                <Link to="/login" className="block" onClick={() => setIsOpen(false)}>{t("connexion")}</Link>
                <Link to="/register" className="block" onClick={() => setIsOpen(false)}>{t("inscription")}</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}