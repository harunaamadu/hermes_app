"use client";

import React, { useActionState, useState } from "react";
import Container from "@/components/common/Container";
import {
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
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import SignWith from "@/components/auth/SignWith";
import Reveal from "@/components/animations/Reveal";
import { loginWithCredentials } from "@/actions/auth";

const LoginClient = () => {
  const [state, formAction, pending] = useActionState(
    loginWithCredentials,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up to auth API once available
  };

  return (
    <Container as="section" aria-label="Login" className="py-0!">
      <div className="grid md:grid-cols-2 gap-10 min-h-full h-auto md:h-175">
        <div className="bg-accent-foreground text-accent p-6 py-12 hidden md:flex flex-col justify-end relative after:absolute after:top-0 after:left-full after:w-18 after:h-full after:bg-inherit after:[clip-path:polygon(0_0,100%_0,0%_100%,0_100%)] after:hidden md:after:block">
          <div>
            <h1 className="font-heading text-5xl">Welcome</h1>
            <p className="mt-2 max-w-xs opacity-80">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Provident vel laboriosam cum velit soluta libero in minima fugiat
              consequuntur veritatis! Iste, dolore ut! Officia?
            </p>

            {/* Bottom mark */}
            <p className="relative z-10 text-[10px] uppercase tracking-widest text-background/60 mt-8">
              © {new Date().getFullYear()} Hermes Store
            </p>
          </div>
        </div>

        <Reveal>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm p-4 py-10">
              <h2 className="font-heading mb-6 text-xl text-center md:text-start">
                Sign In
              </h2>

              <form action={formAction}>
                <FieldLegend>
                  {state?.error && <FieldError>{state.error}</FieldError>}
                </FieldLegend>
                <FieldSet className="w-full">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="identifier">
                        Username or email
                      </FieldLabel>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={UserIcon}
                          size={14}
                          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="identifier"
                          name="identifier"
                          type="text"
                          autoComplete="username"
                          placeholder="Max Leiter or max@example.com"
                          required
                          className="pl-8"
                        />
                      </div>

                      <FieldDescription>
                        Sign in with your username or the email on your account.
                      </FieldDescription>
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
                          autoComplete="current-password"
                          placeholder="••••••••"
                          required
                          minLength={8}
                          className="pl-8 pr-8"
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
                  </FieldGroup>

                  <div className="flex items-center justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      Forgotten password
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-4"
                    disabled={pending}
                  >
                    {pending ? "Signing in" : "Sign in"}
                  </Button>
                </FieldSet>
              </form>

              <div className="mt-4">
                <div className="relative flex items-center my-4 text-sm opacity-60">
                  <Separator />
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background p-2 aspect-square">
                    or
                  </span>
                </div>

                <SignWith />

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Container>
  );
};

export default LoginClient;
