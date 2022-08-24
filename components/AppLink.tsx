import React from "react";
import Link from "next/link";

interface LinkProps {
  href: string;
  label: string;
}

export const AppLink = (props: LinkProps) => {
  const { href, label } = props;

  return (
    <Link href={href.toLowerCase()}>
      <a>{label}</a>
    </Link>
  );
};
