"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { useSession, authClient } from "@/lib/auth-client";

function UpdateInfoContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setForm({ name: session.user.name || "", image: session.user.image || "" });
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // See: https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await authClient.updateUser({
      name: form.name,
      image: form.image,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not update your profile.");
      return;
    }

    toast.success("Profile updated.");
    router.push("/profile");
  };

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <button
        onClick={() => router.back()}
        className="mb-8 inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink"
      >
        <ArrowLeft size={16} /> Back to profile
      </button>

      <h1 className="font-display text-3xl font-semibold text-ink">Update Information</h1>
      <p className="mt-1 text-sm text-ink/60">Keep your member card up to date.</p>

      <form onSubmit={handleSubmit} className="catalog-card mt-8 space-y-4 rounded-sm p-6">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/60">
            Image URL
          </label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full rounded-sm border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brass"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/60">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-sm border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brass"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-paper transition hover:bg-brass disabled:opacity-50"
        >
          {loading ? "Updating…" : "Update Information"}
        </button>
      </form>
    </div>
  );
}

export default function UpdateInfoPage() {
  return (
    <AuthGuard>
      <UpdateInfoContent />
    </AuthGuard>
  );
}
