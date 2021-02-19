import * as React from "react";
import { SignOut } from "./SignOut";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  return (
    <div className="admin-header row">
      <div className="left">
        <h5>
          {t("SiteTitle")}&nbsp;
          <small>{t("AdminPanel")}</small>
        </h5>
      </div>
      <div>
        <SignOut />
      </div>
    </div>
  );
}
