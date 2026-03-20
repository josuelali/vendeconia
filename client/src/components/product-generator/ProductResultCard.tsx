import { useState, type ReactNode } from "react";
import type { GeneratedProductBase } from "@/lib/product-generator";
import {
  Check,
  CheckCircle2,
  Clipboard,
  ExternalLink,
  FileText,
  Package2,
  Tags,
  Video,
  XCircle,
  Code2,
  Info,
} from "lucide-react";

interface ProductResultCardProps {
  result: GeneratedProductBase;
  onCopy: (label: string, value: string) => void;
}

interface CopyButtonProps {
  label: string;
  value: string;
  onCopy: (label: string, value: string) => void;
}

function CopyButton({ label, value, onCopy }: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onCopy(label, value)}
      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700"
    >
      <Clipboard className="mr-2 h-4 w-4" />
      Copiar {label.toLowerCase()}
    </button>
  );
}

function CopyablePanel({
  title,
  value,
  icon,
  onCopy,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  onCopy: (label: string, value: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{title}</p>
          </div>
        </div>

        <CopyButton label={title} value={value} onCopy={onCopy} />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
        <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function CopyAllButton({
  result,
  onCopy,
}: {
  result: GeneratedProductBase;
  onCopy: (label: string, value: string) => void;
}) {
  const payload = [
    `ASIN: ${result.asin}`,
    `Marketplace: ${result.marketplace}`,
    `Entrada: ${result.sourceLabel}`,
    `URL canónica: ${result.canonicalUrl}`,
    `Nombre base: ${result.baseName}`,
    `Categoría: ${result.category}`,
    `Buyer intent: ${result.buyerIntent}`,
    `Ángulo: ${result.angle}`,
    `Slug: ${result.slug}`,
    ``,
    `TÍTULO SEO`,
    result.seoTitle,
    ``,
    `META DESCRIPTION`,
    result.metaDescription,
    ``,
    `INTRO REVIEW`,
    result.reviewIntro,
    ``,
    `RESUMEN`,
    result.summary,
    ``,
    `PROS`,
    result.pros.map((item) => `- ${item}`).join("\n"),
    ``,
    `CONTRAS`,
    result.cons.map((item) => `- ${item}`).join("\n"),
    ``,
    `CTA`,
    result.cta,
    ``,
    `GUION CORTO`,
    result.shortScript,
    ``,
    `BLOQUE AFILIADO HTML`,
    result.affiliateBlock,
  ].join("\n");

  return (
    <button
      type="button"
      onClick={() => onCopy("Pack completo", payload)}
      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
    >
      <Check className="mr-2 h-4 w-4" />
      Copiar pack completo
    </button>
  );
}

export default function ProductResultCard({
  result,
  onCopy,
}: ProductResultCardProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
              Base de producto generada
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              {result.baseName}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {result.reviewIntro}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={result.canonicalUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Ver producto en Amazon
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>

            <CopyAllButton result={result} onCopy={onCopy} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              ASIN
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {result.asin}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Marketplace
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {result.marketplace}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Categoría
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {result.category}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Entrada
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {result.sourceLabel}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Buyer intent
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {result.buyerIntent}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Ángulo
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {result.angle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CopyablePanel
          title="Título SEO"
          value={result.seoTitle}
          icon={<Tags className="h-5 w-5" />}
          onCopy={onCopy}
        />

        <CopyablePanel
          title="Meta description"
          value={result.metaDescription}
          icon={<Info className="h-5 w-5" />}
          onCopy={onCopy}
        />

        <CopyablePanel
          title="Intro review"
          value={result.reviewIntro}
          icon={<FileText className="h-5 w-5" />}
          onCopy={onCopy}
        />

        <CopyablePanel
          title="Resumen"
          value={result.summary}
          icon={<Package2 className="h-5 w-5" />}
          onCopy={onCopy}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Pros sugeridos
                </p>
                <p className="text-xs text-slate-500">
                  Base rápida para review
                </p>
              </div>
            </div>

            <CopyButton
              label="Pros"
              value={result.pros.map((item) => `- ${item}`).join("\n")}
              onCopy={onCopy}
            />
          </div>

          <ul className="mt-5 space-y-3">
            {result.pros.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 text-sm leading-7 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-600">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Contras y alertas
                </p>
                <p className="text-xs text-slate-500">
                  Para no publicar a ciegas
                </p>
              </div>
            </div>

            <CopyButton
              label="Contras"
              value={result.cons.map((item) => `- ${item}`).join("\n")}
              onCopy={onCopy}
            />
          </div>

          <ul className="mt-5 space-y-3">
            {result.cons.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-sm leading-7 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CopyablePanel
          title="CTA"
          value={result.cta}
          icon={<Tags className="h-5 w-5" />}
          onCopy={onCopy}
        />

        <CopyablePanel
          title="Guion corto"
          value={result.shortScript}
          icon={<Video className="h-5 w-5" />}
          onCopy={onCopy}
        />
      </div>

      <CopyablePanel
        title="Bloque afiliado HTML"
        value={result.affiliateBlock}
        icon={<Code2 className="h-5 w-5" />}
        onCopy={onCopy}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
          Notas de validación
        </p>
        <ul className="mt-4 space-y-3">
          {result.notes.map((note) => (
            <li
              key={note}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}