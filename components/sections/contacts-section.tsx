"use client";

import { type CSSProperties } from "react";

import { useInView } from "@/hooks/use-in-view";

interface Contact {
  value: string;
  href: string;
  primary?: boolean;
}

const CONTACTS: Contact[] = [
  { value: "me@toxuh.pro", href: "mailto:me@toxuh.pro", primary: true },
  { value: "github.com/toxuh", href: "https://github.com/toxuh" },
  { value: "linkedin.com/in/toxuh", href: "https://linkedin.com/in/toxuh" },
  { value: "t.me/toxuh", href: "https://t.me/toxuh" },
  { value: "calendly.com/toxuh", href: "https://calendly.com/toxuh/30min" },
];

const ContactsSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh snap-start flex-col justify-between overflow-hidden px-8 py-12 md:px-16 md:py-16 lg:px-24"
      aria-labelledby="contacts-heading"
    >
      <div className="flex items-start justify-between">
        <span
          className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--text-subtle)]"
          aria-hidden="true"
        >
          05
        </span>
        <h2
          id="contacts-heading"
          className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontStyle: "italic" }}
        >
          Contacts
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-start justify-center gap-4 md:gap-6">
        {CONTACTS.map((contact, index) => {
          const style: CSSProperties = {
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`,
          };

          return (
            <a
              key={contact.value}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className={`inline-block transition-colors duration-300 hover:text-[var(--text)] ${
                contact.primary
                  ? "font-[family-name:var(--font-serif)] text-[clamp(2.5rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] text-[var(--text)]"
                  : "font-[family-name:var(--font-mono)] text-[clamp(1.25rem,4vw,2.5rem)] leading-[1.2] tracking-[-0.02em] text-[var(--text-muted)]"
              }`}
              style={{
                ...style,
                fontStyle: contact.primary ? "italic" : undefined,
              }}
            >
              {contact.value}
            </a>
          );
        })}
      </div>

      <footer className="flex items-end justify-between">
        <address className="font-[family-name:var(--font-mono)] text-[10px] not-italic tracking-[0.2em] text-[var(--text-subtle)]">
          Open to opportunities
        </address>
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-subtle)]">
          © {new Date().getFullYear()}
        </span>
      </footer>
    </section>
  );
};

export default ContactsSection;
