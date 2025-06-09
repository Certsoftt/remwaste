export type FooterProps = {
  logo: string;
  description: string;
  email: string;
  phone: string;
};

export type NavLinkProps = {
  label: string;
  links: Array<{
    text: string;
    url: string;
  }>;
};
