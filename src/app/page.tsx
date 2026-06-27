import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[400svh] relative">
      <div className="grid grid-cols-3 items-start w-full p-4 sm:px-6 lg:px-10 max-w-360 mx-auto min-h-screen">
        <h3 className="font-heading text-4xl capitalize">Heading on home</h3>
      </div>
    </main>
  );
}
