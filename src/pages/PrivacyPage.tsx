import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light mb-2">Politique de confidentialité</h1>
      <div className="w-12 h-px bg-black mb-8"></div>

      <div className="space-y-8 text-neutral-600">
        <div>
          <h2 className="text-xl font-medium mb-3">1. Collecte des données</h2>
          <p>Nous collectons les informations suivantes :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Adresse de livraison</li>
            <li>Numéro de téléphone</li>
            <li>Historique des commandes</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">2. Utilisation des données</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Traiter vos commandes</li>
            <li>Vous contacter en cas de problème</li>
            <li>Améliorer nos services</li>
            <li>Vous envoyer nos offres (avec votre consentement)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">3. Protection des données</h2>
          <p>Nous utilisons Supabase pour stocker vos données. Toutes les informations sont sécurisées et accessibles uniquement par le personnel autorisé. Vos mots de passe sont hashés et jamais stockés en clair.</p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">4. Vos droits</h2>
          <p>Conformément à la législation, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : <strong>contact@etoffelegante.com</strong></p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">5. Cookies</h2>
          <p>Notre site utilise des cookies pour faciliter la navigation et mémoriser votre panier. Vous pouvez les désactiver dans les paramètres de votre navigateur.</p>
        </div>
      </div>
    </div>
  );
}