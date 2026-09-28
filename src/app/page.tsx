import { Hero } from "@/components/Hero";
import { Signatures } from "@/components/Signatures";
import { Featured } from "@/components/Featured";
import { Linger } from "@/components/Linger";
import { Menu } from "@/components/Menu";
import { Inside } from "@/components/Inside";
import { On10 } from "@/components/On10";
import { Visit } from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Signatures />
      <Featured />
      <Linger />
      <Menu />
      <Inside />
      <On10 />
      <Visit />
    </>
  );
}
