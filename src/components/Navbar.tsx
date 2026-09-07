import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { COTL_NAV, COTL_TITLE } from "../data/site";
import { useCotl } from "../i18n/LocaleContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Sticky top navigation. Link labels follow the chosen language.
 *
 * On desktop the links and the switcher sit inline. On narrow screens the
 * links (and the switcher) collapse into the "Menu" dropdown, so the top bar
 * only ever shows the brand and the toggle.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { t } = useCotl();

  return (
    <nav className="cotl-nav">
      <div className="cotl-container cotl-nav__inner">
        {/* Text wordmark in the nav; the full Dragonlance logo lives on the home hero. */}
        <Link to="/" className="cotl-nav__brand" onClick={close}>
          {COTL_TITLE}
        </Link>

        <button
          type="button"
          className="cotl-nav__toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.menu.close : t.menu.open}
        </button>

        <ul className={`cotl-nav__links${open ? " is-open" : ""}`}>
          {COTL_NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  isActive ? "is-active" : undefined
                }
                onClick={close}
              >
                {t.nav[item.key]}
              </NavLink>
            </li>
          ))}
          <li className="cotl-nav__lang-item">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
}
