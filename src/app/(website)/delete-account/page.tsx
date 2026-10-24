import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";

const SUPPORT_EMAIL = "support.flexiwalls@gmail.com";
const SUBJECT = "FlexiWalls Account Deletion Request";
const BODY = [
  "Hello FlexiWalls Support,",
  "",
  "I would like to request the deletion of my FlexiWalls account and associated personal data.",
  "",
  "Email address used for my FlexiWalls account: [enter your account email]",
  "",
  "Please let me know if you need to verify that I own this account.",
  "",
  "Thank you.",
].join("\n");

const REQUEST_URL = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  SUBJECT,
)}&body=${encodeURIComponent(BODY)}`;

export const metadata: Metadata = {
  title: "Delete Account & Data | FlexiWalls",
  description:
    "Request deletion of your FlexiWalls wallpaper app account and associated personal data, even if you no longer have the app installed.",
  robots: { index: true, follow: true },
};

const deletionItems = [
  {
    title: "Account & sign-in information",
    description:
      "Your FlexiWalls account profile, including the name and email associated with your account.",
  },
  {
    title: "Activity & preferences",
    description:
      "Your saved favorites, likes, and server-side wallpaper download history associated with your account.",
  },
  {
    title: "Premium profile information",
    description:
      "Premium status and associated in-app account information, subject to any records we must retain for legal or security reasons.",
  },
];

export default function DeleteAccountPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-[var(--text-main)]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-5 pb-12 pt-36 sm:px-8 md:pt-44">
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-purple-400">
            FlexiWalls • Privacy &amp; data
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Delete your{" "}
            <span className="gradient-text">account &amp; data</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            You can request permanent deletion of your FlexiWalls account and
            personal data here, even if you no longer have the Android app
            installed. You do not need to sign in to this website.
          </p>
        </div>

        <section
          aria-labelledby="request-heading"
          className="glass rounded-3xl border border-white/15 p-6 sm:p-9"
        >
          <div className="mb-5 inline-flex rounded-full bg-purple-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-300">
            Account deletion request
          </div>
          <h2 id="request-heading" className="text-2xl font-bold sm:text-3xl">
            Request deletion by email
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-[var(--text-muted)]">
            Send a request from an email address you can access, preferably
            the email you used to sign in to FlexiWalls. We may contact you to
            verify account ownership before deleting account information.
          </p>

          <a
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3 text-center font-bold text-white shadow-lg shadow-purple-900/20 transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
            href={REQUEST_URL}
          >
            Request account &amp; data deletion
          </a>

          <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">
            This opens your email app with a prepared request. Please review
            the message and press Send to submit it.
          </p>
          <p className="mt-3 text-sm leading-7">
            If the button does not open your email app, send a message to{" "}
            <a
              className="break-all font-semibold text-purple-400 underline underline-offset-4"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            with the subject &ldquo;{SUBJECT}&rdquo;. Include the email used
            for your FlexiWalls account.
          </p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Please do not include your password, Google sign-in code, or
            payment card information.
          </p>
        </section>

        <section aria-labelledby="included-heading" className="mt-12">
          <h2 id="included-heading" className="text-2xl font-bold">
            What happens to your data?
          </h2>
          <p className="mt-3 leading-7 text-[var(--text-muted)]">
            When your account deletion request is verified and processed,
            your account and associated server-side information are deleted,
            except for information that must be retained for legitimate
            legal, accounting, fraud-prevention, security, or dispute reasons.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {deletionItems.map((item) => (
              <article className="glass rounded-2xl p-6" key={item.title}>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="important-heading"
          className="mt-10 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 sm:p-8"
        >
          <h2 id="important-heading" className="text-xl font-bold">
            Before you delete your account
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--text-muted)]">
            <li>
              Deleting a FlexiWalls account does not automatically cancel an
              active Google Play subscription.{" "}
              <a
                className="font-semibold text-purple-400 underline underline-offset-4"
                href="https://play.google.com/store/account/subscriptions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Manage or cancel subscriptions in Google Play
              </a>
              .
            </li>
            <li>
              Wallpapers already downloaded to your phone or gallery are
              stored on your device. Delete those files separately if you
              no longer want them.
            </li>
            <li>
              Limited transaction and technical records may be retained
              where required for legal compliance, security, fraud
              prevention, or dispute resolution.
            </li>
          </ul>
        </section>

        <section className="mt-10 glass rounded-3xl p-6 sm:p-8" aria-labelledby="in-app-heading">
          <h2 id="in-app-heading" className="text-xl font-bold">
            You can also delete your account in the Android app
          </h2>
          <p className="mt-3 leading-7 text-[var(--text-muted)]">
            If you are still signed in, open{" "}
            <strong className="text-[var(--text-main)]">Settings</strong>,
            choose{" "}
            <strong className="text-[var(--text-main)]">
              Delete Account and Data
            </strong>
            , and follow the confirmation prompts. If you cannot access the
            app, use the email request above instead.
          </p>
          <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">
            For more information, read the{" "}
            <Link
              href="/privacy-policy#deletion"
              className="font-semibold text-purple-400 underline underline-offset-4"
            >
              FlexiWalls Privacy Policy — account and data deletion
            </Link>
            .
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
