"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BookMarked } from "lucide-react";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.photoURL || undefined,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Could not create your account.");
      toast.error(authError.message || "Registration failed.");
      return;
    }

    toast.success("Account created! Please log in.");
    router.push("/login");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const { error: authError } = await signIn.social({ provider: "google", callbackURL: "/" });
    if (authError) {
      setGoogleLoading(false);
      toast.error(authError.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-5 py-16">
      <div className="mb-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
          <BookMarked size={20} />
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Register</h1>
        <p className="mt-1 text-sm text-ink/60">Join The Reading Room in under a minute.</p>
      </div>

      <form onSubmit={handleSubmit} className="catalog-card space-y-4 rounded-sm p-6">
        {error && <p className="rounded-sm bg-rust/10 px-3 py-2 text-sm text-rust">{error}</p>}

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/60">Name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-sm border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brass"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/60">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-sm border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brass"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/60">Photo URL</label>
          <input
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            className="w-full rounded-sm border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brass"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/60">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-sm border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brass"
            placeholder="At least 8 characters"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-paper transition hover:bg-brass disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Register"}
        </button>

        <div className="relative py-1 text-center text-xs text-ink/40">
          <span className="bg-[#f7f4ea] px-2">or continue with</span>
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full bg-ink/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 py-2.5 text-sm font-medium text-ink transition hover:border-ink disabled:opacity-50"
        >
          <GoogleIcon /> {googleLoading ? "Redirecting…" : "Continue with Google"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        Already a member?{" "}
        <Link href="/login" className="font-semibold text-brass underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.5 35.5 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.6 5.1C9.6 39.7 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.5l6.6 5.4C41.4 36.1 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}
