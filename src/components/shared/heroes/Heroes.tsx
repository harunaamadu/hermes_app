"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Container from "@/components/common/Container";
import Image from "next/image";
import CurrencyFormatter from "@/lib/CurrencyFormatter";
import Link from "next/link";

export interface HeroSlide {
  id: string | number;
  image: string;
  mobileImage?: string;
  title?: string;
  subtitle?: string;
  href?: string;
  startingPrice?: number;
}

interface HeroesProps {
  className?: string;
  slides?: HeroSlide[];
  size?: "full" | "responsive";
  type?: "banner" | "carousel";
  autoplayDelay?: number;
  loading?: boolean;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    title: "Welcome",
    subtitle: "Discover something new",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    title: "Explore",
    subtitle: "Curated just for you",
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    title: "Save more",
    subtitle: "Limited time offers",
  },
];

const RESPONSIVE_RATIO_CLASS = "aspect-[4/5] md:aspect-[16/9]";
const FULL_SCREEN_CLASS = "h-[100dvh]";

function getSizeClass(size: NonNullable<HeroesProps["size"]>) {
  return size === "full" ? FULL_SCREEN_CLASS : RESPONSIVE_RATIO_CLASS;
}

// Direction-aware variants for the caption block sliding in/out
const captionContainerVariants: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const captionItemVariants: Variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -48 : 48,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Heroes = ({
  className,
  slides = DEFAULT_SLIDES,
  size = "responsive",
  type = "banner",
  autoplayDelay = 5000,
  loading,
}: HeroesProps) => {
  const [isMounting, setIsMounting] = React.useState(loading ?? true);
  const [loadedImages, setLoadedImages] = React.useState<Set<string | number>>(
    new Set(),
  );
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0); // 1 = forward, -1 = backward
  const [api, setApi] = React.useState<CarouselApi>();
  const bannerRef = React.useRef<HTMLDivElement>(null);

  const plugin = React.useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  );

  const sizeClass = getSizeClass(size);

  React.useEffect(() => {
    if (loading === false) {
      setIsMounting(false);
      return;
    }
    const timeout = setTimeout(() => setIsMounting(false), 500);
    return () => clearTimeout(timeout);
  }, [loading]);

  // GSAP entrance for the banner
  React.useEffect(() => {
    if (type !== "banner" || isMounting || !bannerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-banner-image",
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" },
      );
      gsap.fromTo(
        ".hero-banner-content > *",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    }, bannerRef);

    return () => ctx.revert();
  }, [type, isMounting]);

  // Track active slide + direction (handles loop wraparound correctly)
  React.useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      const newIndex = api.selectedScrollSnap();
      setActiveIndex((current) => {
        const total = slides.length;
        let diff = newIndex - current;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        setDirection(diff > 0 ? 1 : diff < 0 ? -1 : 0);
        return newIndex;
      });
    };

    updateIndex();
    api.on("select", updateIndex);
    return () => {
      api.off("select", updateIndex);
    };
  }, [api, slides.length]);

  const handleImageLoad = (id: string | number) =>
    setLoadedImages((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  if (isMounting) {
    return (
      <HeroesSkeleton type={type} sizeClass={sizeClass} className={className} />
    );
  }

  // ---------- Banner ----------
  if (type === "banner") {
    const banner = slides[0];
    if (!banner) return null;

    return (
      <div
        ref={bannerRef}
        className={cn("relative w-full overflow-hidden", sizeClass, className)}
      >
        {!loadedImages.has(banner.id) && (
          <Skeleton className="absolute inset-0 h-full w-full" />
        )}
        <picture>
          {banner.mobileImage && (
            <source media="(max-width: 767px)" srcSet={banner.mobileImage} />
          )}
          <img
            src={banner.image}
            alt={banner.title ?? "Hero banner"}
            onLoad={() => handleImageLoad(banner.id)}
            className={cn(
              "hero-banner-image absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
              loadedImages.has(banner.id) ? "opacity-100" : "opacity-0",
            )}
          />
        </picture>
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="hero-banner-content absolute inset-0 flex flex-col items-start justify-end gap-2 p-6 text-white md:p-10">
          {banner.title && (
            <h3 className="font-heading text-3xl font-bold capitalize md:text-4xl">
              {banner.title}
            </h3>
          )}
          {banner.subtitle && (
            <p className="max-w-md text-sm text-white/80 md:text-base">
              {banner.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ---------- Carousel ----------
  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <Container as="div" className="py-0!">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
        className={cn("group relative w-full max-w-full", className)}
      >
        <CarouselContent>
          {activeSlide.href && (
            <Link
              href={activeSlide.href}
              className="inset-0 absolute w-full h-full z-10"
            />
          )}
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <motion.div
                className="h-full p-1"
                initial={false}
                animate={{
                  opacity: activeIndex === index ? 1 : 0.55,
                  scale: activeIndex === index ? 1 : 0.97,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className="overflow-hidden border-none p-0!">
                  <CardContent
                    className={cn(
                      "relative flex items-center justify-center p-0",
                      sizeClass,
                    )}
                  >
                    {!loadedImages.has(slide.id) && (
                      <Skeleton className="absolute inset-0 h-full w-full" />
                    )}
                    <picture>
                      {slide.mobileImage && (
                        <source
                          media="(max-width: 767px)"
                          srcSet={slide.mobileImage}
                        />
                      )}
                      <Image
                        src={slide.image}
                        alt={slide.title ?? `Slide ${index + 1}`}
                        onLoad={() => handleImageLoad(slide.id)}
                        fill
                        sizes="100vw"
                        priority={index === 0}
                        className={cn(
                          "h-full w-full object-cover transition-opacity duration-500",
                          loadedImages.has(slide.id)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </picture>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Caption overlay — fully decoupled from Embla-managed slide DOM,
            driven purely by activeIndex so AnimatePresence works reliably. */}
        <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-end overflow-hidden p-4 pb-12 md:p-10">
            <AnimatePresence mode="wait" custom={direction}>
              {(activeSlide?.title || activeSlide?.subtitle) && (
                <motion.div
                  key={activeSlide.id}
                  custom={direction}
                  variants={captionContainerVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="max-w-xl"
                >
                  {activeSlide.title && (
                    <motion.h2
                      custom={direction}
                      variants={captionItemVariants}
                      className="text-lg font-semibold text-white md:text-4xl"
                    >
                      {activeSlide.title}
                    </motion.h2>
                  )}
                  {activeSlide.subtitle && (
                    <motion.p
                      custom={direction}
                      variants={captionItemVariants}
                      className="mt-1 text-sm text-white/80 md:text-base"
                    >
                      {activeSlide.subtitle}{" "}
                      {activeSlide.startingPrice && (
                        <CurrencyFormatter
                          className="font-semibold"
                          amountInBase={activeSlide.startingPrice}
                        />
                      )}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <CarouselPrevious className="left-2 opacity-0 transition-opacity group-hover:opacity-100  z-20" />
        <CarouselNext className="right-2 opacity-0 transition-opacity group-hover:opacity-100  z-20" />

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === i
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/75",
              )}
            />
          ))}
        </div>
      </Carousel>
    </Container>
  );
};

function HeroesSkeleton({
  type,
  sizeClass,
  className,
}: {
  type: HeroesProps["type"];
  sizeClass: string;
  className?: string;
}) {
  if (type === "banner") {
    return <Skeleton className={cn("w-full", sizeClass, className)} />;
  }
  return (
    <div className={cn("w-full", className)}>
      <Skeleton className={cn("w-full", sizeClass)} />
      <div className="mt-3 flex justify-center gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-1.5 w-6 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export default Heroes;
