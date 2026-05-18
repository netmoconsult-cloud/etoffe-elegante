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
    accueil: "Accueil",
    tissus: "Tissus",
    sacs: "Sacs",
    nouveautes: "Nouveautés",
    apropos: "À propos",
    contact: "Contact",
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
    aucun_produit_trouve: "Aucun produit trouvé",
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
    
    // Jours
    dimanche: "Dimanche",
    lundi: "Lundi",
    mardi: "Mardi",
    mercredi: "Mercredi",
    jeudi: "Jeudi",
    vendredi: "Vendredi",
    samedi: "Samedi",
  },
  en: {
    // Navigation
    accueil: "Home",
    tissus: "Fabrics",
    sacs: "Bags",
    nouveautes: "New Arrivals",
    apropos: "About",
    contact: "Contact",
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
    aucun_produit_trouve: "No products found",
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
    
    // Days
    dimanche: "Sunday",
    lundi: "Monday",
    mardi: "Tuesday",
    mercredi: "Wednesday",
    jeudi: "Thursday",
    vendredi: "Friday",
    samedi: "Saturday",
  },
  es: {
    accueil: "Inicio",
    tissus: "Telas",
    sacs: "Bolsos",
    nouveautes: "Novedades",
    apropos: "Sobre",
    contact: "Contacto",
    admin: "Admin",
    connexion: "Iniciar sesión",
    inscription: "Registrarse",
    deconnexion: "Cerrar sesión",
    recherche: "Buscar...",
    panier: "Carrito",
    hero_title: "Telas y bolsos elegantes",
    hero_subtitle: "Colecciones auténticas y modernas para revelar tu estilo",
    voir_tissus: "Ver telas",
    voir_sacs: "Ver bolsos",
    produits_populaires: "Productos populares",
    livraison_rapide: "Envío rápido",
    paiement_securise: "Pago seguro",
    retour_facile: "Devolución fácil",
    whatsapp: "WhatsApp 24/7",
    nos_collections: "Nuestras colecciones",
    tous: "Todos",
    aucun_produit: "No hay productos",
    aucun_produit_trouve: "No se encontraron productos",
    ajouter_au_panier: "Añadir al carrito",
    ajoute_au_panier: "ha sido añadido al carrito",
    retour: "Volver",
    description: "Descripción",
    stock: "Stock",
    en_vedette: "Destacado",
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
    mdp_incorrect: "Correo o contraseña incorrectos",
    email_utilise: "Este correo ya está en uso",
    mdp_non_correspondent: "Las contraseñas no coinciden",
    dimanche: "Domingo",
    lundi: "Lunes",
    mardi: "Martes",
    mercredi: "Miércoles",
    jeudi: "Jueves",
    vendredi: "Viernes",
    samedi: "Sábado",
  },
  ar: {
    accueil: "الرئيسية",
    tissus: "الأقمشة",
    sacs: "الحقائب",
    connexion: "تسجيل الدخول",
    inscription: "إنشاء حساب",
    deconnexion: "تسجيل الخروج",
    panier: "السلة",
    ajouter_au_panier: "أضف إلى السلة",
    mon_panier: "سلتي",
    vide: "سلتك فارغة",
    nos_collections: "مجموعاتنا",
    tous: "الكل",
    aucun_produit_trouve: "لا توجد منتجات",
    dimanche: "الأحد",
    lundi: "الاثنين",
    mardi: "الثلاثاء",
    mercredi: "الأربعاء",
    jeudi: "الخميس",
    vendredi: "الجمعة",
    samedi: "السبت",
  },
  it: {
    accueil: "Home",
    tissus: "Tessuti",
    sacs: "Borse",
    connexion: "Accedi",
    inscription: "Registrati",
    deconnexion: "Esci",
    panier: "Carrello",
    ajouter_au_panier: "Aggiungi al carrello",
    mon_panier: "Il mio carrello",
    vide: "Il carrello è vuoto",
    nos_collections: "Le nostre collezioni",
    tous: "Tutti",
    aucun_produit_trouve: "Nessun prodotto trovato",
    dimanche: "Domenica",
    lundi: "Lunedì",
    mardi: "Martedì",
    mercredi: "Mercoledì",
    jeudi: "Giovedì",
    vendredi: "Venerdì",
    samedi: "Sabato",
  },
  de: {
    accueil: "Startseite",
    tissus: "Stoffe",
    sacs: "Taschen",
    connexion: "Anmelden",
    inscription: "Registrieren",
    deconnexion: "Abmelden",
    panier: "Warenkorb",
    ajouter_au_panier: "In den Warenkorb",
    mon_panier: "Mein Warenkorb",
    vide: "Ihr Warenkorb ist leer",
    nos_collections: "Unsere Kollektionen",
    tous: "Alle",
    aucun_produit_trouve: "Keine Produkte gefunden",
    dimanche: "Sonntag",
    lundi: "Montag",
    mardi: "Dienstag",
    mercredi: "Mittwoch",
    jeudi: "Donnerstag",
    vendredi: "Freitag",
    samedi: "Samstag",
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
