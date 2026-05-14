import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr" | "en" | "es" | "ar" | "it" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Dictionnaire complet des traductions
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    tissus: "Tissus",
    sacs: "Sacs",
    nouveautes: "Nouveautés",
    apropos: "À propos",
    admin: "Admin",
    connexion: "Connexion",
    inscription: "Inscription",
    deconnexion: "Déconnexion",
    recherche: "Rechercher...",
    panier: "Panier",
    
    // Accueil
    hero_title: "Tissus et sacs élégants",
    hero_subtitle: "Des collections authentiques et modernes pour révéler votre style",
    voir_tissus: "Voir les tissus",
    voir_sacs: "Voir les sacs",
    produits_populaires: "Produits populaires",
    
    // Services
    livraison_rapide: "Livraison rapide",
    paiement_securise: "Paiement sécurisé",
    retour_facile: "Retour facile",
    whatsapp: "WhatsApp 24/7",
    
    // Boutique
    nos_collections: "Nos collections",
    tous: "Tous",
    aucun_produit: "Aucun produit",
    ajouter_au_panier: "Ajouter au panier",
    ajoute_au_panier: "a été ajouté au panier",
    
    // Produit
    retour: "Retour",
    description: "Description",
    stock: "Stock",
    en_vedette: "Produit en vedette",
    
    // Panier
    mon_panier: "Mon panier",
    vide: "Votre panier est vide",
    decouvrir_boutique: "Découvrir la boutique",
    produit: "Produit",
    prix: "Prix",
    quantite: "Quantité",
    total: "Total",
    sous_total: "Sous-total",
    livraison: "Livraison",
    gratuite: "Gratuite",
    vider_panier: "Vider le panier",
    proceder_paiement: "Procéder au paiement",
    
    // Checkout
    informations_livraison: "Informations de livraison",
    adresse: "Adresse de livraison",
    telephone: "Numéro de téléphone",
    continuer_paiement: "Continuer vers le paiement",
    mode_paiement: "Mode de paiement",
    confirmation: "Commande Confirmée !",
    commande_validee: "Votre paiement a été validé. Vous recevrez votre commande sous 48h.",
    reference: "Référence",
    total_paye: "Total payé",
    voir_commandes: "Voir mes commandes",
    continuer_achats: "Continuer les achats",
    
    // Admin
    administration: "Administration",
    connecte_commme: "Connecté en tant que",
    tester_connexion: "Tester connexion",
    total_produits: "Total produits",
    ajouter_produit: "Ajouter un produit",
    modifier_produit: "Modifier un produit",
    supprimer: "Supprimer",
    annuler: "Annuler",
    mettre_a_jour: "Mettre à jour",
    nom_produit: "Nom",
    description_produit: "Description",
    prix_fcfa: "Prix (FCFA)",
    categorie: "Catégorie",
    image_produit: "Image du produit",
    choisir_image: "Choisir une image",
    supprimer_image: "Supprimer l'image",
    url_image: "Ou collez une URL d'image",
    
    // Auth
    creer_compte: "Créer un compte",
    rejoindre: "Rejoignez Étoffe Élégante",
    nom_complet: "Nom complet",
    email: "Email",
    mot_de_passe: "Mot de passe",
    confirmer_mdp: "Confirmer le mot de passe",
    deja_compte: "Déjà un compte",
    pas_compte: "Pas encore de compte",
    se_connecter: "Se connecter",
    sinscrire: "S'inscrire",
    mdp_incorrect: "Email ou mot de passe incorrect",
    email_utilise: "Cet email est déjà utilisé",
    mdp_non_correspondent: "Les mots de passe ne correspondent pas",
  },
  en: {
    // Navigation
    tissus: "Fabrics",
    sacs: "Bags",
    nouveautes: "New Arrivals",
    apropos: "About",
    admin: "Admin",
    connexion: "Login",
    inscription: "Sign Up",
    deconnexion: "Logout",
    recherche: "Search...",
    panier: "Cart",
    
    // Home
    hero_title: "Elegant Fabrics & Bags",
    hero_subtitle: "Authentic and modern collections to reveal your style",
    voir_tissus: "View Fabrics",
    voir_sacs: "View Bags",
    produits_populaires: "Popular Products",
    
    // Services
    livraison_rapide: "Fast Delivery",
    paiement_securise: "Secure Payment",
    retour_facile: "Easy Returns",
    whatsapp: "WhatsApp 24/7",
    
    // Shop
    nos_collections: "Our Collections",
    tous: "All",
    aucun_produit: "No products found",
    ajouter_au_panier: "Add to Cart",
    ajoute_au_panier: "has been added to cart",
    
    // Product
    retour: "Back",
    description: "Description",
    stock: "Stock",
    en_vedette: "Featured",
    
    // Cart
    mon_panier: "My Cart",
    vide: "Your cart is empty",
    decouvrir_boutique: "Discover the Shop",
    produit: "Product",
    prix: "Price",
    quantite: "Quantity",
    total: "Total",
    sous_total: "Subtotal",
    livraison: "Shipping",
    gratuite: "Free",
    vider_panier: "Clear Cart",
    proceder_paiement: "Proceed to Checkout",
    
    // Checkout
    informations_livraison: "Shipping Information",
    adresse: "Shipping Address",
    telephone: "Phone Number",
    continuer_paiement: "Continue to Payment",
    mode_paiement: "Payment Method",
    confirmation: "Order Confirmed!",
    commande_validee: "Your payment has been validated. You will receive your order within 48 hours.",
    reference: "Reference",
    total_paye: "Total Paid",
    voir_commandes: "View my orders",
    continuer_achats: "Continue Shopping",
    
    // Admin
    administration: "Administration",
    connecte_commme: "Logged in as",
    tester_connexion: "Test connection",
    total_produits: "Total products",
    ajouter_produit: "Add product",
    modifier_produit: "Edit product",
    supprimer: "Delete",
    annuler: "Cancel",
    mettre_a_jour: "Update",
    nom_produit: "Name",
    description_produit: "Description",
    prix_fcfa: "Price (FCFA)",
    categorie: "Category",
    image_produit: "Product image",
    choisir_image: "Choose an image",
    supprimer_image: "Delete image",
    url_image: "Or paste an image URL",
    
    // Auth
    creer_compte: "Create account",
    rejoindre: "Join Étoffe Élégante",
    nom_complet: "Full name",
    email: "Email",
    mot_de_passe: "Password",
    confirmer_mdp: "Confirm password",
    deja_compte: "Already have an account",
    pas_compte: "Don't have an account",
    se_connecter: "Sign in",
    sinscrire: "Sign up",
    mdp_incorrect: "Incorrect email or password",
    email_utilise: "Email already in use",
    mdp_non_correspondent: "Passwords do not match",
  },
  es: {
    // Navigation
    tissus: "Telas",
    sacs: "Bolsos",
    nouveautes: "Novedades",
    apropos: "Sobre",
    admin: "Admin",
    connexion: "Iniciar sesión",
    inscription: "Registrarse",
    deconnexion: "Cerrar sesión",
    recherche: "Buscar...",
    panier: "Carrito",
    
    // Home
    hero_title: "Telas y bolsos elegantes",
    hero_subtitle: "Colecciones auténticas y modernas para revelar tu estilo",
    voir_tissus: "Ver telas",
    voir_sacs: "Ver bolsos",
    produits_populaires: "Productos populares",
    
    // Services
    livraison_rapide: "Envío rápido",
    paiement_securise: "Pago seguro",
    retour_facile: "Devolución fácil",
    whatsapp: "WhatsApp 24/7",
    
    // Shop
    nos_collections: "Nuestras colecciones",
    tous: "Todos",
    aucun_produit: "No hay productos",
    ajouter_au_panier: "Añadir al carrito",
    ajoute_au_panier: "ha sido añadido al carrito",
    
    // Product
    retour: "Volver",
    description: "Descripción",
    stock: "Stock",
    en_vedette: "Destacado",
    
    // Cart
    mon_panier: "Mi carrito",
    vide: "Tu carrito está vacío",
    decouvrir_boutique: "Descubrir tienda",
    produit: "Producto",
    prix: "Precio",
    quantite: "Cantidad",
    total: "Total",
    sous_total: "Subtotal",
    livraison: "Envío",
    gratuite: "Gratis",
    vider_panier: "Vaciar carrito",
    proceder_paiement: "Proceder al pago",
    
    // Checkout
    informations_livraison: "Información de envío",
    adresse: "Dirección",
    telephone: "Teléfono",
    continuer_paiement: "Continuar al pago",
    mode_paiement: "Método de pago",
    confirmation: "¡Pedido confirmado!",
    commande_validee: "Tu pago ha sido validado. Recibirás tu pedido en 48 horas.",
    reference: "Referencia",
    total_paye: "Total pagado",
    voir_commandes: "Ver mis pedidos",
    continuer_achats: "Seguir comprando",
    
    // Admin
    administration: "Administración",
    connecte_commme: "Conectado como",
    tester_connexion: "Probar conexión",
    total_produits: "Total productos",
    ajouter_produit: "Añadir producto",
    modifier_produit: "Editar producto",
    supprimer: "Eliminar",
    annuler: "Cancelar",
    mettre_a_jour: "Actualizar",
    nom_produit: "Nombre",
    description_produit: "Descripción",
    prix_fcfa: "Precio (FCFA)",
    categorie: "Categoría",
    image_produit: "Imagen",
    choisir_image: "Elegir imagen",
    supprimer_image: "Eliminar imagen",
    url_image: "O pegar URL de imagen",
    
    // Auth
    creer_compte: "Crear cuenta",
    rejoindre: "Únete a Étoffe Élégante",
    nom_complet: "Nombre completo",
    email: "Correo",
    mot_de_passe: "Contraseña",
    confirmer_mdp: "Confirmar contraseña",
    deja_compte: "¿Ya tienes cuenta?",
    pas_compte: "¿No tienes cuenta?",
    se_connecter: "Iniciar sesión",
    sinscrire: "Registrarse",
  },
  ar: {
    // Navigation
    tissus: "الأقمشة",
    sacs: "الحقائب",
    nouveautes: "الواصل حديثاً",
    apropos: "عن",
    admin: "مدير",
    connexion: "تسجيل الدخول",
    inscription: "إنشاء حساب",
    deconnexion: "تسجيل الخروج",
    recherche: "بحث...",
    panier: "السلة",
    
    // Home
    hero_title: "أقمشة وحقائب أنيقة",
    hero_subtitle: "مجموعات أصلية وعصرية لإبراز أناقتك",
    voir_tissus: "عرض الأقمشة",
    voir_sacs: "عرض الحقائب",
    produits_populaires: "المنتجات الأكثر مبيعاً",
    
    // Services
    livraison_rapide: "توصيل سريع",
    paiement_securise: "دفع آمن",
    retour_facile: "إرجاع سهل",
    whatsapp: "واتساب 24/7",
    
    // Shop
    nos_collections: "مجموعاتنا",
    tous: "الكل",
    aucun_produit: "لا توجد منتجات",
    ajouter_au_panier: "أضف إلى السلة",
    ajoute_au_panier: "تمت الإضافة إلى السلة",
    
    // Product
    retour: "رجوع",
    description: "الوصف",
    stock: "المخزون",
    en_vedette: "مميز",
    
    // Cart
    mon_panier: "سلتي",
    vide: "سلتك فارغة",
    decouvrir_boutique: "استكشف المتجر",
    produit: "المنتج",
    prix: "السعر",
    quantite: "الكمية",
    total: "المجموع",
    sous_total: "المجموع الفرعي",
    livraison: "الشحن",
    gratuite: "مجاني",
    vider_panier: "إفراغ السلة",
    proceder_paiement: "المتابعة للدفع",
    
    // Checkout
    informations_livraison: "معلومات التوصيل",
    adresse: "عنوان التوصيل",
    telephone: "رقم الهاتف",
    continuer_paiement: "المتابعة للدفع",
    mode_paiement: "طريقة الدفع",
    confirmation: "تم تأكيد الطلب!",
    commande_validee: "تم تأكيد الدفع. ستتلقى طلبك خلال 48 ساعة.",
    reference: "المرجع",
    total_paye: "المبلغ المدفوع",
    voir_commandes: "عرض طلباتي",
    continuer_achats: "مواصلة التسوق",
    
    // Admin
    administration: "لوحة التحكم",
    connecte_commme: "متصل كـ",
    tester_connexion: "اختبار الاتصال",
    total_produits: "إجمالي المنتجات",
    ajouter_produit: "إضافة منتج",
    modifier_produit: "تعديل منتج",
    supprimer: "حذف",
    annuler: "إلغاء",
    mettre_a_jour: "تحديث",
    nom_produit: "الاسم",
    description_produit: "الوصف",
    prix_fcfa: "السعر (FCFA)",
    categorie: "الفئة",
    image_produit: "صورة المنتج",
    choisir_image: "اختر صورة",
    supprimer_image: "حذف الصورة",
    url_image: "أو ألصق رابط صورة",
    
    // Auth
    creer_compte: "إنشاء حساب",
    rejoindre: "انضم إلى إيتوف إيليغانت",
    nom_complet: "الاسم الكامل",
    email: "البريد الإلكتروني",
    mot_de_passe: "كلمة المرور",
    confirmer_mdp: "تأكيد كلمة المرور",
    deja_compte: "لديك حساب بالفعل؟",
    pas_compte: "ليس لديك حساب؟",
    se_connecter: "تسجيل الدخول",
    sinscrire: "إنشاء حساب",
  },
  it: {
    // Navigation
    tissus: "Tessuti",
    sacs: "Borse",
    nouveautes: "Novità",
    apropos: "Su di noi",
    admin: "Admin",
    connexion: "Accedi",
    inscription: "Registrati",
    deconnexion: "Esci",
    recherche: "Cerca...",
    panier: "Carrello",
    
    // Home
    hero_title: "Tessuti e borse eleganti",
    hero_subtitle: "Collezioni autentiche e moderne per rivelare il tuo stile",
    voir_tissus: "Vedi tessuti",
    voir_sacs: "Vedi borse",
    produits_populaires: "Prodotti popolari",
    
    // Services
    livraison_rapide: "Consegna rapida",
    paiement_securise: "Pagamento sicuro",
    retour_facile: "Reso facile",
    whatsapp: "WhatsApp 24/7",
    
    // Shop
    nos_collections: "Le nostre collezioni",
    tous: "Tutti",
    aucun_produit: "Nessun prodotto",
    ajouter_au_panier: "Aggiungi al carrello",
    ajoute_au_panier: "è stato aggiunto al carrello",
    
    // Cart
    mon_panier: "Il mio carrello",
    vide: "Il carrello è vuoto",
    decouvrir_boutique: "Scopri il negozio",
    proceder_paiement: "Procedi al pagamento",
  },
  de: {
    // Navigation
    tissus: "Stoffe",
    sacs: "Taschen",
    nouveautes: "Neuheiten",
    apropos: "Über uns",
    admin: "Admin",
    connexion: "Anmelden",
    inscription: "Registrieren",
    deconnexion: "Abmelden",
    recherche: "Suchen...",
    panier: "Warenkorb",
    
    // Home
    hero_title: "Elegante Stoffe & Taschen",
    hero_subtitle: "Authentische und moderne Kollektionen, um Ihren Stil zu enthüllen",
    voir_tissus: "Stoffe ansehen",
    voir_sacs: "Taschen ansehen",
    produits_populaires: "Beliebte Produkte",
    
    // Cart
    mon_panier: "Mein Warenkorb",
    vide: "Ihr Warenkorb ist leer",
    decouvrir_boutique: "Shop entdecken",
    proceder_paiement: "Zur Kasse gehen",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved && ["fr", "en", "es", "ar", "it", "de"].includes(saved) ? saved : "fr";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations["fr"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}