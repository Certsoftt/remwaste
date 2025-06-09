export interface FooterProps {
  logo: string;
  description: string;
  email: string;
  phone: string;
}

export interface NavLinkProps {
  label: string;
  links: Array<{
    text: string;
    url: string;
  }>;
}
