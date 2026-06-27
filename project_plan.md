hermes/
├── middleware.ts                # Now also: reads req.geo / x-vercel-ip-country header,
│                                 # sets a `hermes_locale` cookie default on first visit
│                                 # (only if user hasn't manually overridden it)
...
└── src/
    ├── types/
    │   ├── product.ts
    │   ├── order.ts
    │   ├── sanity.ts
    │   └── locale.ts              # New: Country, Currency, LocaleState interfaces
    │
    ├── data/                      # New: static reference data (no DB roundtrip needed)
    │   ├── countries.ts            # Country list: code, name, flag, default currency
    │   └── currencies.ts           # Currency list: code, symbol, name, decimal rules
    │
    ├── app/
    │   ├── ...
    │   └── api/
    │       ├── auth/...
    │       ├── products/route.ts
    │       ├── search/route.ts
    │       ├── checkout/route.ts
    │       ├── coupons/route.ts
    │       ├── geo/route.ts                  # New: returns detected {country, currency} from
    │       │                                  # IP/edge headers — fallback for client-side calls
    │       ├── exchange-rates/route.ts       # New: fetches + caches FX rates (revalidate ~hourly),
    │       │                                  # so price conversion doesn't hit a 3rd-party API per request
    │       └── webhooks/
    │           └── sanity/route.ts
    │
    ├── components/
    │   ├── ui/
    │   ├── icons/
    │   ├── animations/
    │   │   ├── Reveal.tsx
    │   │   ├── FadeIn.tsx
    │   │   ├── SlideDown.tsx
    │   │   └── StaggerChildren.tsx
    │   │
    │   ├── layout/
    │   │   ├── header/
    │   │   │   ├── ui/
    │   │   │   │   ├── CustomDropdown.tsx
    │   │   │   │   └── LocaleDialog.tsx       # New: shadcn Dialog — manual country/currency picker,
    │   │   │   │                                # searchable list, wrapped in <FadeIn>
    │   │   │   ├── Header.tsx
    │   │   │   ├── HeaderAnnouncement.tsx      # Renders <LocaleSwitcher /> (ship-to + currency pill)
    │   │   │   ├── LocaleSwitcher.tsx          # New: trigger button + flag/currency label,
    │   │   │   │                                # opens LocaleDialog on click
    │   │   │   ├── HeaderNav.tsx               # Nav links with dropdowns
    │   │   │   ├── HeaderActions.tsx
    │   │   │   ├── HeaderMegaMenu.tsx
    │   │   │   ├── MobileBottomNav.tsx
    │   │   │   └── MobileMenu.tsx
    │   │   └── footer/
    │   │       └── Footer.tsx
    │   ├── marketing/...
    │   ├── product/
    │   │   ├── ProductCard.tsx                 # Now reads useLocaleStore for price formatting
    │   │   ├── ProductGallery.tsx
    │   │   ├── ProductReviews.tsx
    │   │   └── AddToCartButton.tsx
    │   └── shared/
    │       ├── Navbar.tsx
    │       ├── PriceTag.tsx                    # Now currency-aware: converts + formats per locale
    │       ├── RatingStars.tsx
    │       └── EmptyState.tsx
    │
    ├── hooks/
    │   ├── useGsapAnimation.ts
    │   ├── useMediaQuery.ts
    │   ├── useDebounce.ts
    │   └── useGeoLocation.ts                   # New: on mount, checks cookie → falls back to
    │                                             # /api/geo if no preference set yet
    │
    ├── lib/
    │   ├── db.ts
    │   ├── utils.ts
    │   ├── auth.ts
    │   ├── constants.ts
    │   ├── geo.ts                               # New: parses edge geo headers, country→currency
    │   │                                          # mapping lookup against data/countries.ts
    │   ├── currency.ts                          # New: formatPrice(amount, currency), convert(amount,
    │   │                                          # from, to, rates) — Intl.NumberFormat under the hood
    │   ├── animations/
    │   │   ├── gsapPresets.ts
    │   │   └── framerVariants.ts
    │   └── validations/
    │       ├── auth.ts
    │       ├── checkout.ts
    │       └── product.ts
    │
    └── store/
        ├── useCartStore.ts
        ├── useUserStore.ts
        ├── useWishlistStore.ts
        └── useLocaleStore.ts                    # New: { country, currency, rates }, persisted
                                                   # via zustand/middleware `persist` (localStorage),
                                                   # `isManualOverride` flag so auto-detect never
                                                   # clobbers a user's explicit choice


hermes/
└── src/
    ├── types/
    │   ├── product.ts
    │   ├── order.ts
    │   ├── sanity.ts
    │   ├── locale.ts
    │   └── currency.ts                    # New: ExchangeRates shape { base, rates, fetchedAt }
    │
    ├── app/
    │   └── api/
    │       ├── auth/...
    │       ├── products/route.ts
    │       ├── search/route.ts
    │       ├── geo/route.ts
    │       ├── exchange-rates/
    │       │   └── route.ts                # New: fetches + server-caches live FX rates (1hr revalidate)
    │       ├── checkout/route.ts
    │       ├── coupons/route.ts
    │       └── webhooks/sanity/route.ts
    │
    ├── components/
    │   ├── providers/                      # New top-level folder: app-wide context providers
    │   │   └── CurrencyProvider.tsx        # New: wraps the app, exposes useCurrency() hook
    │   │
    │   ├── ui/
    │   ├── icons/
    │   ├── animations/
    │   │   ├── Reveal.tsx
    │   │   ├── FadeIn.tsx
    │   │   ├── SlideDown.tsx
    │   │   └── StaggerChildren.tsx
    │   │
    │   ├── layout/
    │   │   └── header/...
    │   ├── marketing/...
    │   ├── product/...
    │   └── shared/
    │       ├── PriceTag.tsx                # Now implemented: consumes useCurrency()
    │       ├── SearchBar.tsx
    │       ├── Navbar.tsx
    │       ├── RatingStars.tsx
    │       └── EmptyState.tsx
    │
    ├── lib/
    │   ├── db.ts
    │   ├── utils.ts
    │   ├── auth.ts
    │   ├── constants.ts
    │   ├── geo.ts
    │   ├── currency.ts                      # New: convertAmount(), formatPrice() — pure functions
    │   ├── animations/
    │   │   ├── gsapPresets.ts
    │   │   └── framerVariants.ts
    │   └── validations/...
    │
    └── store/
        ├── useCartStore.ts
        ├── useUserStore.ts
        ├── useWishlistStore.ts
        └── useLocaleStore.ts                # Unchanged location — still owns country/currency selection