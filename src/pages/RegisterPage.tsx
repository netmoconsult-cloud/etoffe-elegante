import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (password !== confirmPassword) {
      setError(t("mdp_non_correspondent"));
      return;
    }
    
    if (password.length < 6) {
      setError(t("mdp_trop_court"));
      return;
    }
    
    const success = await register(name, email, password);
    if (success) {
      setMessage(t("inscription_reussie"));
      setTimeout(() => navigate("/"), 2000);
    } else {
      setError(t("email_utilise"));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light tracking-wide">{t("creer_compte")}</h2>
          <p className="text-neutral-500 mt-2">{t("rejoindre")}</p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t("nom_complet")}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              placeholder={t("nom_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("email")}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="client@example.com"
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

          <div>
            <label className="block text-sm font-medium mb-2">{t("confirmer_mdp")}</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition"
          >
            {t("sinscrire")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          {t("deja_compte")}{" "}
          <Link to="/login" className="text-black border-b border-black">
            {t("se_connecter")}
          </Link>
        </p>
      </div>
    </div>
  );
}