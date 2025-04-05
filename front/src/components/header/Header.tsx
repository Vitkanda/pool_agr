import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Поплаваем</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/#pools">Наши бассейны</Link>
          <Link href="/#partners">Партнеры</Link>
          <Link href="/#blog">Статьи</Link>
          <Link href="/#contact">Контакты</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
