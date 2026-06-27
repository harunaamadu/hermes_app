import { createPageMetadata } from "@/lib/seo/metadata";
import LoginClient from "./LoginClient";

export const metadata = createPageMetadata(
  "Login",
  "Sign in to your Hermes account to access your orders and wishlist."
);

const LoginPage = () => {
  
  return (
    <main className="w-full h-full">
      <LoginClient />
    </main>
  );
};

export default LoginPage;
