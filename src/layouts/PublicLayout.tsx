import React from "react";
import { Outlet } from "react-router-dom";
import ExternalHeader from "./components/ExternalHeader";
import "./PublicLayout.css";

interface PublicLayoutProps {
  background?: 1 | 2;
  stripe?: 1 | 2;
  header?: boolean;
  isStatic?: boolean;
  options?: boolean;
  children?: React.ReactNode;
}

export default function PublicLayout({ isStatic, header, background, stripe, options, children }: PublicLayoutProps) {
  isStatic = isStatic ?? true;
  header = header ?? true;
  background = background ?? 1;
  stripe = stripe ?? 1;
  options = options ?? true;
  children = children ?? null;

  header == false ? (isStatic = false) : null;

  const layoutClass = isStatic === false ? "public-layout1" : "public-layout2";
  const backgroundClass = background === 2 ? "bg-2" : "bg-1";

  const headerClass = !header ? "header-hidden" : null;

  const headerStripeClass = stripe === 2 ? "gray-stripe" : "color-stripe";

  return (
    <div className={layoutClass + " " + backgroundClass}>
      <header className={`${headerClass} ${headerStripeClass}`}>
        <ExternalHeader options={options} />
      </header>
      <main>{children ? children : <Outlet />}</main>
    </div>
  );
}
