import { Link } from "react-router-dom";

export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light mb-2">Mentions légales</h1>
      <div className="w-12 h-px bg-black mb-8"></div>

      <div className="space-y-8 text-neutral-600">
        <div>
          <h2 className="text-xl font-medium mb-3">1. Éditeur du site</h2>
          <p>
            <strong>NETMO</strong><br />
            Siège social : Dakar, Sénégal<br />
            Email : netmo.consult@gmail.com
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">2. Directeur de publication</h2>
          <p>Mme/M. Barro – Gérant d'Étoffe Élégante</p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">3. Hébergement</h2>
          <p>
            <strong>Supabase</strong><br />
            https://supabase.com<br />
            Société américaine proposant une base de données et une authentification.<br />
            Données hébergées sur les serveurs européens.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">4. Propriété intellectuelle</h2>
          <p>L'ensemble des éléments du site (textes, images, logos, produits) sont la propriété exclusive d'Étoffe Élégante. Toute reproduction est interdite sans autorisation préalable.</p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">5. Responsabilité</h2>
          <p>Étoffe Élégante s'efforce de fournir des informations exactes. Nous ne pouvons garantir l'exactitude permanente des informations. L'utilisation du site se fait sous votre responsabilité.</p>
        </div>
      </div>
    </div>
  );
}