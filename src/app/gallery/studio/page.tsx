"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  LogOut,
  Loader2,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import UploadModal from "@/components/studio/UploadModal";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function GalleryStudio() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [secret, setSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  // Check existing auth session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/studio/verify");
      if (response.ok) {
        setIsAuthorized(true);
        fetchGallery();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifySecret = async (val: string) => {
    setAuthError("");
    try {
      const response = await fetch("/api/studio/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: val }),
      });

      if (response.ok) {
        setIsAuthorized(true);
        fetchGallery();
      } else {
        const data = await response.json();
        setAuthError(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setAuthError("Verification failed");
    }
  };

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      // Add timestamp to bypass CDN cache (admin needs fresh data)
      const response = await fetch(`/api/gallery?_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data.resources || []);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifySecret(secret);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/studio/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsAuthorized(false);
      setItems([]);
      setSecret("");
      setAuthError("");
      router.refresh();
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm("Are you sure you want to delete this masterpiece?")) return;

    setIsDeleting(publicId);
    try {
      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (response.ok) {
        setItems(items.filter((item) => item.public_id !== publicId));
      } else if (response.status === 401) {
        // Session expired, redirect to login
        setIsAuthorized(false);
        alert("Session expired. Please login again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const onUploadSuccess = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E84CFF", "#B026FF", "#7000FF"],
    });
    fetchGallery();
  };

  if (isLoading && items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-studio-dark)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--color-neon)] animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[var(--color-studio-dark)] flex items-center justify-center px-6">
        <div className="w-full max-w-md p-8 bg-[var(--color-studio-slate)] border border-hairline border-[var(--color-textdim)]/20 rounded-studio">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-[var(--color-text)] tracking-tighter uppercase mb-2">
              Studio Access
            </h1>
            <p className="text-[var(--color-textmuted)] text-xs uppercase tracking-widest font-mono">
              Restricted Area // 管理
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Enter Admin Secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                disabled={isLoading}
                className="w-full bg-[var(--color-nightdark)] border border-[var(--color-textdim)]/20 p-4 text-sm text-[var(--color-text)] focus:border-[var(--color-neon)] outline-none transition-all font-mono disabled:opacity-50"
              />
              {authError && (
                <p className="mt-2 text-[var(--color-neonpink)] text-xs font-mono">
                  {authError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || !secret}
              className="w-full py-4 bg-[var(--color-neon)] text-[var(--color-studio-dark)] font-black uppercase tracking-[0.2em] text-xs rounded-sm hover:brightness-110 transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Unlock Dashboard"
              )}
            </button>
          </form>
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-[10px] text-[var(--color-textdim)] uppercase tracking-wider hover:text-[var(--color-text)] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-studio-dark)] text-[var(--color-text)]">
      {/* Header - solid color, no blur for performance */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-studio-slate)]/95 border-b border-hairline border-[var(--color-textdim)]/10 py-4 px-6 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-black tracking-tighter uppercase">
            Gallery <span className="text-[var(--color-neon)]">Studio</span>
          </h1>
          <span className="hidden md:block px-3 py-1 bg-[var(--color-neon)]/10 text-[var(--color-neon)] text-[9px] uppercase tracking-widest font-mono border border-[var(--color-neon)]/20">
            Admin Mode
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchGallery}
            className="p-2 text-[var(--color-textmuted)] hover:text-[var(--color-neon)] transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
          <Link
            href="/"
            className="text-[10px] uppercase tracking-widest text-[var(--color-textmuted)] hover:text-[var(--color-text)] transition-colors font-mono ml-2"
          >
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 text-[var(--color-textmuted)] hover:text-[var(--color-neonpink)] transition-colors ml-2"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="pt-24 pb-20 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-1">
              Portfolio Assets
            </h2>
            <p className="text-[var(--color-textmuted)] text-xs uppercase tracking-widest font-mono">
              Total Artworks: {items.length}
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-neon)] text-[var(--color-studio-dark)] text-xs font-black uppercase tracking-widest rounded-sm hover:-translate-y-1 transition-all shadow-[0_4px_20px_rgba(232,76,255,0.2)]"
          >
            <Plus className="w-4 h-4" />
            Add New Item
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest border border-hairline transition-all rounded-sm ${
              activeTab === "all"
                ? "bg-[var(--color-neon)] text-[var(--color-studio-dark)] border-[var(--color-neon)]"
                : "bg-[var(--color-nightmid)] text-[var(--color-textdim)] border-[var(--color-textdim)]/10 hover:border-[var(--color-textdim)]/30 hover:text-[var(--color-text)]"
            }`}
          >
            All Managed
          </button>
          {siteConfig.galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest border border-hairline transition-all rounded-sm ${
                activeTab === cat.id
                  ? "bg-[var(--color-neon)] text-[var(--color-studio-dark)] border-[var(--color-neon)]"
                  : "bg-[var(--color-nightmid)] text-[var(--color-textdim)] border-[var(--color-textdim)]/10 hover:border-[var(--color-textdim)]/30 hover:text-[var(--color-text)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6">
          {items
            .filter(
              (item) => activeTab === "all" || item.category === activeTab,
            )
            .map((item) => (
              <div
                key={item.public_id}
                className="group relative aspect-video bg-[var(--color-studio-slate)] border border-hairline border-[var(--color-textdim)]/10 overflow-hidden rounded-studio transition-all hover:border-[var(--color-neon)]/30"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-studio-dark)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 line-clamp-1">
                    {item.label}
                  </p>
                  <p className="text-[8px] font-mono text-[var(--color-textdim)] uppercase tracking-widest mb-3">
                    {item.category}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(item.public_id)}
                      disabled={isDeleting === item.public_id}
                      className="p-2 bg-[var(--color-neonpink)]/10 text-[var(--color-neonpink)] hover:bg-[var(--color-neonpink)] hover:text-[var(--color-studio-dark)] transition-all flex-1 flex items-center justify-center"
                    >
                      {isDeleting === item.public_id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[var(--color-neon)]/10 text-[var(--color-neon)] hover:bg-[var(--color-neon)] hover:text-[var(--color-studio-dark)] transition-all flex-1 flex items-center justify-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}

          {items.length === 0 && !isLoading && (
            <div
              onClick={() => setIsUploadModalOpen(true)}
              className="aspect-video lg:col-span-1 bg-[var(--color-studio-slate)] border border-dashed border-[var(--color-textdim)]/20 rounded-studio flex flex-col items-center justify-center group hover:border-[var(--color-neon)]/50 transition-colors cursor-pointer p-8 text-center"
            >
              <ImageIcon className="w-8 h-8 text-[var(--color-textdim)] mb-4 group-hover:text-[var(--color-neon)] transition-colors" />
              <p className="text-[10px] text-[var(--color-textdim)] uppercase tracking-widest font-mono leading-relaxed">
                No items found. <br /> Start a new project upload!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={onUploadSuccess}
        />
      )}
    </div>
  );
}
