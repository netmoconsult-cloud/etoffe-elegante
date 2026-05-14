import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, Shield, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  // Récupérer l'adresse IP via une API externe
  const getIpAddress = async (): Promise<string> => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch {
      return "unknown";
    }
  };

  // Enregistrer le consentement dans Supabase
  const saveConsentToDatabase = async (consentType: string) => {
    try {
      const ipAddress = await getIpAddress();
      const { error } = await supabase.from("cookie_consents").insert([
        {
          user_id: user?.id || null,
          consent_type: consentType,
          ip_address: ipAddress,
          user_agent: navigator.userAgent,
        }
      ]);
      if (error) console.error("Erreur sauvegarde consentement:", error);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const acceptAll = async () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("privacyAccepted", "true");
    await saveConsentToDatabase("accepted");
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  const acceptEssential = async () => {
    localStorage.setItem("cookieConsent", "essential");
    await saveConsentToDatabase("essential");
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  const decline = async () => {
    localStorage.setItem("cookieConsent", "declined");
    await saveConsentToDatabase("declined");
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl overflow-hidden">
        {/* En-tête */}
        <div className="bg-black text-white p-6 text-center">
          <Cookie className="w-12 h-12 mx-auto mb-3 opacity-80" />
          <h2 className="text-2xl font-light">Respect de votre vie privée</h2>
          <p className="text-neutral-300 text-sm mt-2">Nous accordons une grande importance à la protection de vos données</p>
        </div>

        {/* Contenu */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <p className="text-neutral-600 text-sm leading-relaxed mb-4">
            Chez <strong>Étoffe Élégante</strong>, nous utilisons des cookies et des technologies similaires 
            pour améliorer votre expérience, mémoriser votre panier, analyser le trafic et personnaliser 
            le contenu. Certains cookies sont essentiels au fonctionnement du site.
          </p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-black underline mb-4"
          >
            {showDetails ? "Masquer les détails" : "Voir les détails des cookies"}
          </button>

          {showDetails && (
            <div className="space-y-3 mb-4 text-sm">
              <div className="bg-neutral-50 p-3 rounded-lg">
                <h4 className="font-medium">🍪 Cookies essentiels</h4>
                <p className="text-neutral-500 text-xs mt-1">Nécessaires au fonctionnement du site (panier, connexion, paiement). Ne peuvent être désactivés.</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded-lg">
                <h4 className="font-medium">📊 Cookies analytiques</h4>
                <p className="text-neutral-500 text-xs mt-1">Nous aident à améliorer nos services en analysant l'utilisation du site.</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded-lg">
                <h4 className="font-medium">🎯 Cookies de personnalisation</h4>
                <p className="text-neutral-500 text-xs mt-1">Mémorisent vos préférences (langue, panier, produits vus).</p>
              </div>
            </div>
          )}

          <div className="bg-neutral-50 p-4 rounded-lg mt-2">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-green-600 mt-0.5" />
              <p className="text-xs text-neutral-600">
                Vos données sont sécurisées et ne seront jamais partagées avec des tiers sans votre consentement.
                Vous pouvez modifier vos préférences à tout moment dans les paramètres.
              </p>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={decline}
              className="flex-1 py-3 border border-neutral-300 rounded-full text-sm font-medium hover:bg-neutral-100 transition"
            >
              <XCircle size={16} className="inline mr-2" />
              Refuser tous
            </button>
            <button
              onClick={acceptEssential}
              className="flex-1 py-3 border border-black rounded-full text-sm font-medium hover:bg-neutral-100 transition"
            >
              <CheckCircle size={16} className="inline mr-2" />
              Cookies essentiels uniquement
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 py-3 bg-black text-white rounded-full text-sm font-medium hover:opacity-80 transition"
            >
              <CheckCircle size={16} className="inline mr-2" />
              Tout accepter
            </button>
          </div>
          <p className="text-center text-xs text-neutral-400 mt-4">
            En poursuivant, vous acceptez notre{" "}
            <Link to="/privacy" className="text-black underline">politique de confidentialité</Link>{" "}
            et nos{" "}
            <Link to="/terms" className="text-black underline">CGV</Link>
          </p>
        </div>
      </div>
    </div>
  );
}