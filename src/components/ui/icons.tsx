import { Forklift, Mountain, Package, Snowflake, Truck, type LucideProps } from "lucide-react";
import type { ServiceIcon as ServiceIconKey } from "@/lib/services";

const map = { mountain: Mountain, truck: Truck, snowflake: Snowflake, forklift: Forklift, package: Package };

export function ServiceIcon({ name, ...props }: { name: ServiceIconKey } & LucideProps) {
  const Icon = map[name];
  return <Icon {...props} />;
}

export function WhatsAppIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.93.96-3.49-.23-.36a9.44 9.44 0 0 1-1.45-5.03C2.56 6.8 6.8 2.56 12.04 2.56c2.54 0 4.92.99 6.71 2.78a9.42 9.42 0 0 1 2.78 6.7c0 5.24-4.26 9.46-9.49 9.46m8.07-17.53A11.33 11.33 0 0 0 12.04.62C5.75.62.63 5.74.63 12.03c0 2.01.52 3.97 1.52 5.7L.53 23.62l6.03-1.58a11.38 11.38 0 0 0 5.47 1.4h.01c6.29 0 11.41-5.12 11.41-11.41 0-3.05-1.19-5.91-3.34-8.07" />
    </svg>
  );
}
