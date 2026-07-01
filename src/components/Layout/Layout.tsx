import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              S
            </span>
            <div>
              <p className={styles.brandEyebrow}>SPRY Therapeutics</p>
              <h1 className={styles.title}>Task Management Dashboard</h1>
            </div>
          </div>
          <nav className={styles.nav} aria-label="Main navigation">
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              All Tasks
            </NavLink>
            <NavLink
              to="/completed"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              Completed
            </NavLink>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
