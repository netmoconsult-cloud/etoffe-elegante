import { useState } from "react";
import { useAuth } from "../contexts/Authcontext";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log("Tentative connexion:", email);
    
    const success = await login(email, password);
    
    if (success) {
      console.log("Connexion réussie, redirection...");
      navigate("/");
    } else {
      console.log("Connexion échouée");
      setError(t("mdp_incorrect"));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light tracking-wide">{t("connexion")}</h2>
          <p className="text-neutral-500 mt-2">{t("acceder_compte")}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t("email")}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="admin@etoffelegante.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("mot_de_passe")}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition disabled:opacity-50"
          >
            {loading ? t("connexion_en_cours") : t("se_connecter")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          {t("pas_compte")}{" "}
          <Link to="/register" className="text-black border-b border-black">
            {t("sinscrire")}
          </Link>
        </p>
      </div>
    </div>
  );
}