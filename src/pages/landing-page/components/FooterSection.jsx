import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", path: "#benefits" },
      { label: "How It Works", path: "#how-it-works" },
      { label: "Plant Database", path: "#" },
      { label: "Pricing", path: "#" },
    ],
    resources: [
      {
        label: "Learn About Soil Regeneration",
        path: "https://www.usda.gov/topics/conservation/soil-health",
      },
      {
        label: "Urban Greening Research",
        path: "https://www.epa.gov/green-infrastructure/what-green-infrastructure",
      },
      {
        label: "Sustainable Plant Guide",
        path: "https://extension.umn.edu/landscape-design/planting-and-maintaining-bee-lawn",
      },
    ],
    company: [
      { label: "About Us", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Contact", path: "#" },
      { label: "Partners", path: "#" },
    ],
    legal: [
      { label: "Privacy Policy", path: "#" },
      { label: "Terms of Service", path: "#" },
      { label: "Cookie Policy", path: "#" },
      { label: "Licenses", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: "Facebook", label: "Facebook", url: "#" },
    { icon: "Twitter", label: "Twitter", url: "#" },
    { icon: "Instagram", label: "Instagram", url: "#" },
    { icon: "Linkedin", label: "LinkedIn", url: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/landing-page" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Sprout" size={24} color="var(--color-primary)" />
              </div>
              <span className="font-heading font-semibold text-xl text-foreground">
                SoilRevive
              </span>
            </Link>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Translating soil science into practical planting plans for
              measurable, long-term regeneration outcomes.
            </p>
            <div className="flex gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  aria-label={social?.label}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-organic"
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.path}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-organic"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-organic"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.path}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-organic"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.path}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-organic"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              (c) {currentYear} SoilRevive. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Leaf" size={16} color="var(--color-success)" />
              <span>Committed to evidence-driven restoration</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
