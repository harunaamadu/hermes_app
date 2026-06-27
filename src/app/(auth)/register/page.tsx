import { createPageMetadata } from "@/lib/seo/metadata";
import RegisterClient from "./RegisterClient";

export const metadata = createPageMetadata(
  "Create Account",
  "Join Hermes and start shopping with a personalized experience."
);

const RegisterPage = () => {
    return (
    <main className="w-full h-full">
      <RegisterClient />
    </main>
  );
};

export default RegisterPage;