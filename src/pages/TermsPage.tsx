import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light mb-2">Conditions Générales de Vente</h1>
      <div className="w-12 h-px bg-black mb-8"></div>

      <div className="space-y-8 text-neutral-600">
        <div>
          <h2 className="text-xl font-medium mb-3">1. Prix</h2>
          <p>Les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises (TVA 18%). Les frais de livraison sont de <strong>2 000 FCFA</strong> pour Dakar et banlieue.</p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">2. Commande</h2>
          <p>La validation de la commande vaut acceptation des présentes CGV. Un récapitulatif vous est envoyé par email. Nous nous réservons le droit d'annuler toute commande en cas de litige.</p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">3. Paiement</h2>
          <p>Les paiements s'effectuent via :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Wave (Mobile Money)</li>
            <li>Orange Money</li>
            <li>Espèces à la livraison</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">4. Livraison</h2>
          <p><strong>Zone couverte :</strong> Dakar et banlieue uniquement.<br />
          <strong>Délai :</strong> 24h à 48h ouvrées.<br />
          <strong>Frais :</strong> 2 000 FCFA.</p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">5. Retour et remboursement</h2>
          <p>Vous disposez de <strong>14 jours</strong> à compter de la réception pour retourner un produit non utilisé, dans son emballage d'origine. Les frais de retour sont à votre charge. Le remboursement est effectué sous 7 jours ouvrés.</p>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-3">6. Service client</h2>
          <p>Pour toute question : <strong>contact@etoffelegante.com</strong> ou <strong>+221 77 482 92 92</strong> (WhatsApp).</p>
        </div>
      </div>
    </div>
  );
}