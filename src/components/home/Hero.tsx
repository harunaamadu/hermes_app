import React from "react";
import Container from "../common/Container";
import Heroes, { HeroSlide } from "../shared/heroes/Heroes";

const am = Number(23);

const _SLIDES: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1774754747322-b71d46ff3fd3?q=80&w=1374&auto=format&fit=crop",
    title: "Winter wear",
    subtitle: "Discover something new",
    href: "/category/fashion/winterwear/",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=1470&auto=format&fit=crop",
    title: "Kitchen Essentials",
    subtitle: `Under`,
    startingPrice: 50,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1470&auto=format&fit=crop",
    title: "Game store",
    subtitle: "Upgrade you gaming gear",
  },
];

const Hero = () => {
  return <Heroes type="carousel" slides={_SLIDES} />;
};

export default Hero;
