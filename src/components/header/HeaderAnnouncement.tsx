import LocaleSwitcher from "./LocaleSwitcher";
import CurrencyFormatter from "@/lib/CurrencyFormatter";

const PROMO_AMOUNT_THRESHOLD_USD = 100;

export default function HeaderAnnouncement() {
  return (
    <div className="bg-accent-foreground text-xs text-accent">
      <div className="mx-auto flex h-9 max-w-360 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <LocaleSwitcher />
        <p className="hidden truncate text-secondary sm:block">
          Free delivery on orders over <CurrencyFormatter amountInBase={PROMO_AMOUNT_THRESHOLD_USD} />
        </p>
        <a href="/login" className="shrink-0 transition-colors text-accent/60 hover:text-accent">
          Sign in <span className="hidden sm:inline">for faster checkout</span>
        </a>
      </div>
    </div>
  );
}