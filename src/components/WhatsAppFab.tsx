import { WHATSAPP_URL } from "@/lib/site";

export default function WhatsAppFab() {
  return (
    <a
      href={`${WHATSAPP_URL}?text=Hola%20Reflexcam%2C%20quiero%20más%20información`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-unit-lg right-unit-lg z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-background shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95"
    >
      <svg
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.39.7 4.61 1.91 6.48L4.4 27.6a.6.6 0 0 0 .74.73l6.27-1.65a11.96 11.96 0 0 0 4.6.92h.01c6.63 0 12.01-5.38 12.01-12.01C28.03 8.38 22.65 3 16.01 3Zm0 21.9h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.72.98.99-3.63-.24-.37a9.86 9.86 0 0 1-1.52-5.29c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.2 5.08 4.36 2.98 1.16 2.98.78 3.52.73.54-.05 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
