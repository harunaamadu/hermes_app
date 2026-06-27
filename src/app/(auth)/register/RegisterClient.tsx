"use client";

import { createPageMetadata } from "@/lib/seo/metadata";
import React, { useState } from "react";
import Container from "@/components/common/Container";
import {
  AtIcon,
  IdIcon,
  LockKeyIcon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import SignWith from "@/components/auth/SignWith";
import Reveal from "@/components/animations/Reveal";
import { slugify } from "@/lib/constants";

const RegisterClient = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameEdited, setUsernameEdited] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    // TODO: wire up to auth API once available
  };

  return (
    <Container as="section" aria-label="Register" className="py-0!">
      <Reveal>
        <div className="grid md:grid-cols-2 gap-10 min-h-full h-auto md:min-h-175">
          <div className="bg-accent-foreground text-accent p-6 py-12 hidden md:flex flex-col justify-end relative after:absolute after:top-0 after:left-full after:w-18 after:h-full after:bg-inherit after:[clip-path:polygon(0_0,100%_0,0%_100%,0_100%)]">
            <div>
              <h1 className="font-heading text-5xl">Join Hermes</h1>
              <p className="mt-2 max-w-xs opacity-80">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Provident vel laboriosam cum velit soluta libero in minima
                fugiat consequuntur veritatis! Iste, dolore ut! Officia?
              </p>

              {/* Bottom mark */}
              <p className="relative z-10 text-[10px] uppercase tracking-widest text-background/60 mt-8">
                © {new Date().getFullYear()} Hermes Store
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm md:p-4 py-10">
              <h2 className="font-heading mb-6 text-xl text-center md:text-start">
                Sign Up
              </h2>

              <form onSubmit={handleSubmit}>
                <FieldSet className="w-full">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Full name</FieldLabel>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={IdIcon}
                          size={14}
                          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Max Leiter"
                          required
                          className="pl-8"
                          onChange={(e) => {
                            if (!usernameEdited) {
                              setUsername(slugify(e.target.value));
                            }
                          }}
                        />
                      </div>
                    </Field>

                    {/* Auto-suggested from full name until the user edits
                          it themselves; server still enforces uniqueness
                          and appends a suffix if it's already taken. */}
                    <Field>
                      <FieldLabel htmlFor="username">Username</FieldLabel>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={UserIcon}
                          size={14}
                          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          placeholder="maxleiter"
                          required
                          className="pl-8"
                          value={username}
                          onChange={(e) => {
                            setUsernameEdited(true);
                            setUsername(e.target.value);
                          }}
                        />
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={AtIcon}
                          size={14}
                          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="max@example.com"
                          required
                          className="pl-8"
                        />
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={LockKeyIcon}
                          size={14}
                          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          required
                          minLength={8}
                          className="pl-8 pr-8"
                          onChange={() => setPasswordMismatch(false)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <HugeiconsIcon
                            icon={showPassword ? ViewOffIcon : ViewIcon}
                            size={14}
                          />
                        </button>
                      </div>
                      <FieldDescription>
                        Must be at least 8 characters long.
                      </FieldDescription>
                    </Field>

                    <Field data-invalid={passwordMismatch}>
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm password
                      </FieldLabel>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={LockKeyIcon}
                          size={14}
                          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          required
                          minLength={8}
                          aria-invalid={passwordMismatch}
                          className="pl-8"
                          onChange={() => setPasswordMismatch(false)}
                        />
                      </div>
                      {passwordMismatch && (
                        <FieldError>Passwords don&apos;t match.</FieldError>
                      )}
                    </Field>

                    <Field orientation="horizontal">
                      <Checkbox id="terms" name="terms" required />
                      <FieldLabel
                        htmlFor="terms"
                        className="text-[9px] md:text-xs font-normal text-muted-foreground whitespace-nowrap"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="underline underline-offset-4 hover:text-foreground"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="underline underline-offset-4 hover:text-foreground"
                        >
                          Privacy Policy
                        </Link>
                      </FieldLabel>
                    </Field>
                  </FieldGroup>

                  <Button type="submit" size="lg" className="mt-4">
                    Create account
                  </Button>
                </FieldSet>
              </form>

              <div className="mt-4">
                <FieldSeparator>or</FieldSeparator>

                <SignWith />

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
};

export default RegisterClient;
