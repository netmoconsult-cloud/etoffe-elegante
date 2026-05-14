import { useState } from "react";
import { Link } from "react-router-dom";

interface PrivacyCheckboxProps {
  onAccept: (accepted: boolean) => void;
}

export default function PrivacyCheckbox({ onAccept }: PrivacyCheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        id="privacy"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          onAccept(e.target.checked);
        }}
        className="mt-0.5"
      />
      <label htmlFor="privacy" className="text-xs text-neutral-500">
        J'accepte la{" "}
        <Link to="/privacy" className="text-black underline">
          politique de confidentialité
        </Link>{" "}
        et les{" "}
        <Link to="/terms" className="text-black underline">
          conditions générales de vente
        </Link>
      </label>
    </div>
  );
}