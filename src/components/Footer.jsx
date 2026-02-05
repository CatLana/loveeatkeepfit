import Image from "next/image";

const whatsappUrl = "https://wa.me/+353834753468";

export default function Footer({ footer, social }) {
  return (
    <footer id="contact" className="border-t border-beige bg-warmwhite py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-charcoal/70 max-w-md">{footer.disclaimer}</p>
        <div className="flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-leaf px-4 py-2 text-sm font-semibold text-leaf transition hover:bg-leaf hover:text-white"
          >
            <Image
              src="/icons/whatsapp.svg"
              alt="WhatsApp"
              width={18}
              height={18}
            />
            {footer.contact}
          </a>
          <a
            href={social.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-coral px-4 py-2 text-sm font-semibold text-coral transition hover:bg-coral hover:text-white"
          >
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={18}
              height={18}
            />
            {footer.contactInstagram}
          </a>
        </div>
      </div>
    </footer>
  );
}
