import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { COTL_NAV, COTL_TITLE } from "../data/site";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Sticky top navigation. Labels stay in Portuguese; the language switcher
 * changes the reading content, not the chrome.
 *
 * On desktop the links and the switcher sit inline. On narrow screens the
 * links (and the switcher) collapse into the "Menu" dropdown, so the top bar
 * only ever shows the brand and the toggle.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="cotl-nav">
      <div className="cotl-container cotl-nav__inner">
        <Link to="/" className="cotl-nav__brand" onClick={close}>
          <Logo className="cotl-nav__logo" fallbackClassName="cotl-nav__logo-text" />
          <span>{COTL_TITLE}</span>
        </Link>

        <button
          type="button"
          className="cotl-nav__toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fechar" : "Menu"}
        </button>

        <ul className={`cotl-nav__links${open ? " is-open" : ""}`}>
          {COTL_NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
                onClick={close}
              >
                {item.label}
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
