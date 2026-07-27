import Navbar from "@/components/website/Navbar";

const LAST_UPDATED = "July 27, 2026";
const SUPPORT_EMAIL = "support.flexiwalls@gmail.com";
const APP_NAME = "FlexiWalls";
const PACKAGE_NAME = "com.flexiwalls.app";

type PolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: Array<{
    label?: string;
    text: string;
  }>;
};

const quickFacts = [
  {
    title: "We do not sell personal data",
    text: "FlexiWalls does not sell or rent your personal information to data brokers.",
  },
  {
    title: "Your personal photo library is not uploaded",
    text: "Media permissions are used only for wallpaper download, save, selection, and deletion features you request.",
  },
  {
    title: "Free users may see Google ads",
    text: "Google Mobile Ads may process device, interaction, diagnostic, and advertising information to deliver and measure ads.",
  },
  {
    title: "You can delete your account",
    text: "Delete your account in the app or request deletion by emailing our privacy contact.",
  },
];

const sections: PolicySection[] = [
  {
    id: "scope",
    title: "1. Scope of this policy",
    paragraphs: [
      "This Privacy Policy explains how the developer of FlexiWalls (\"FlexiWalls,\" \"we,\" \"us,\" or \"our\") collects, uses, stores, shares, and protects information when you use the FlexiWalls Android application, website, backend APIs, support channels, and related services.",
      "FlexiWalls lets users browse, favorite, like, download, and apply image or video wallpapers. Some features are available to guests, while account-based features and premium access require sign-in.",
    ],
  },
  {
    id: "collect",
    title: "2. Information we collect",
    items: [
      {
        label: "Google account information:",
        text: "When you use Google Sign-In, we receive information made available through the sign-in flow, such as your Google account identifier, name, email address, email-verification status, and profile image.",
      },
      {
        label: "Account and profile information:",
        text: "We process your FlexiWalls user ID, username, email address, avatar, account role, account creation date, premium status, and premium-expiry information.",
      },
      {
        label: "App activity:",
        text: "We process favorites, likes, wallpaper download history, selected download quality, daily download counts, subscription status, and related activity needed to provide app features and prevent abuse.",
      },
      {
        label: "Guest activity:",
        text: "For guest downloads, the app creates a random guest identifier and sends it with wallpaper download events so we can apply guest limits, prevent duplicate processing, and reduce abuse.",
      },
      {
        label: "Session and technical information:",
        text: "Our services may process login and logout times, session records, IP address, user-agent, request date and time, API errors, app version, device or operating-system information, and security logs.",
      },
      {
        label: "Advertising and SDK information:",
        text: "Google Mobile Ads may automatically collect and share IP address, approximate general location derived from IP, app launches, taps, ad or video interactions, diagnostic information, Android advertising ID, app set ID, and other device or account identifiers for advertising, ad measurement, analytics, and fraud prevention.",
      },
      {
        label: "Purchase and subscription information:",
        text: "For Google Play purchases, we may receive and store the selected product or plan, purchase token, order or transaction identifier, payment status, acknowledgement or verification result, currency, amount when available, and relevant dates. Google processes your payment-method credentials.",
      },
      {
        label: "Support information:",
        text: "If you contact us, we receive your email address, message, and any information or files you choose to provide.",
      },
    ],
  },
  {
    id: "use",
    title: "3. How we use information",
    items: [
      { text: "Authenticate your account and keep you signed in." },
      { text: "Provide wallpapers, categories, favorites, likes, downloads, trending content, and account features." },
      { text: "Apply guest and free-user limits and prevent duplicate or abusive download activity." },
      { text: "Verify, activate, maintain, restore, and cancel premium entitlements and subscriptions." },
      { text: "Display, personalize where permitted, measure, and protect advertising shown to eligible users." },
      { text: "Maintain service security, prevent fraud, investigate misuse, and enforce our rights." },
      { text: "Diagnose errors, improve reliability and performance, and respond to support or privacy requests." },
      { text: "Comply with legal, accounting, tax, payment, and regulatory obligations." },
    ],
  },
  {
    id: "device",
    title: "4. Device storage and Android permissions",
    items: [
      {
        label: "Secure device storage:",
        text: "The app stores your login token, basic profile information, and guest identifier using secure device storage where supported.",
      },
      {
        label: "Local app storage:",
        text: "The app stores notification and Wi-Fi-only preferences, local favorites or download records, wallpaper details, file locations, and media asset identifiers on your device.",
      },
      {
        label: "Photos and media:",
        text: "Photo and media access is used to save wallpapers, locate app-created downloads, and delete wallpapers you select. FlexiWalls does not intentionally upload or scan unrelated photos or videos from your personal library.",
      },
      {
        label: "Media location metadata:",
        text: "The Android build may include media-location access through the media-library integration. FlexiWalls does not use photo location metadata for advertising, user profiling, or upload to our servers.",
      },
      {
        label: "Set wallpaper:",
        text: "Android wallpaper access is used only when you choose to apply an image or live wallpaper to the home screen, lock screen, or both.",
      },
      {
        label: "Notifications:",
        text: "Notification permission is requested only when you enable notifications. The current notification preference is stored locally on your device.",
      },
      {
        label: "Network state:",
        text: "The app checks network or Wi-Fi status when needed to load content and to respect the Wi-Fi-only download preference.",
      },
      {
        text: "You can change permissions in Android settings. Disabling a permission may prevent the related feature from working.",
      },
    ],
  },
  {
    id: "ads",
    title: "5. Advertising",
    paragraphs: [
      "FlexiWalls uses Google Mobile Ads to support free access. Depending on the app version and screen, eligible users may see banner, native, interstitial, app-open, or rewarded ads. Rewarded ads are shown only when you choose an ad-supported action that offers a reward.",
      "Google and its advertising partners may use information described in this policy to deliver personalized or non-personalized ads, measure performance, limit repeated ads, detect fraud, and produce reports. The type of ad served may depend on your consent choices, age or account settings, region, device settings, and Google policies.",
      "You can reset or delete the Android advertising ID through your device settings. Where required by law, an appropriate consent or privacy-choice flow must be presented before data is used for personalized advertising.",
    ],
  },
  {
    id: "payments",
    title: "6. Premium purchases and Google Play Billing",
    paragraphs: [
      "Purchases made in the Android app are processed through Google Play Billing. Google handles payment credentials and the payment methods connected to your Google Play account.",
      "FlexiWalls receives purchase and subscription information needed to verify the transaction, activate premium access, restore purchases, process cancellation or expiry, resolve disputes, prevent fraud, and satisfy accounting or legal requirements. We do not receive or store your full card number, CVV, UPI PIN, or online-banking password.",
      "Managing or deleting your FlexiWalls account does not automatically cancel a Google Play subscription. Subscriptions must also be managed through Google Play. Some transaction records may be retained when required for tax, accounting, refunds, disputes, chargebacks, fraud prevention, or legal compliance.",
    ],
  },
  {
    id: "sharing",
    title: "7. Service providers and data sharing",
    items: [
      {
        label: "Google:",
        text: "Google provides Sign-In, Google Play Billing, Google Mobile Ads, Play services, and related fraud-prevention, attribution, and device services.",
      },
      {
        label: "Backend hosting:",
        text: "Render may host FlexiWalls backend services and process requests and operational logs.",
      },
      {
        label: "Database hosting:",
        text: "Supabase may host the PostgreSQL database that stores account, activity, entitlement, and related service records.",
      },
      {
        label: "Media storage and delivery:",
        text: "Cloudflare R2 and related content-delivery services may store and deliver wallpaper files, previews, and thumbnails.",
      },
      {
        label: "Website hosting:",
        text: "Vercel may host the FlexiWalls public website and process standard web request information.",
      },
      {
        label: "Legal and safety:",
        text: "We may disclose information when required by law or when reasonably necessary to protect users, investigate fraud, secure the service, or enforce legal rights.",
      },
      {
        label: "Business changes:",
        text: "If FlexiWalls is reorganized, sold, or transferred, relevant information may transfer with the service subject to this policy and applicable law.",
      },
      {
        text: "We do not sell or rent personal information to data brokers.",
      },
    ],
  },
  {
    id: "retention",
    title: "8. Retention",
    items: [
      {
        label: "Account information:",
        text: "Account data, favorites, likes, cloud download history, and premium-profile information are generally retained while your account is active or until deletion is completed, subject to limited legal or security retention.",
      },
      {
        label: "Guest and local information:",
        text: "The guest identifier, preferences, and local download history remain on your device until you clear app data, uninstall the app, or remove the records. Server-side guest download records may be retained for abuse prevention and usage limits.",
      },
      {
        label: "Technical records:",
        text: "Security, request, diagnostic, and error logs are retained only for a period reasonably needed for operations, security, fraud prevention, or legal obligations.",
      },
      {
        label: "Purchase records:",
        text: "Transaction and entitlement records may be retained for accounting, tax, refunds, disputes, chargebacks, fraud prevention, and compliance for as long as required or reasonably necessary.",
      },
    ],
  },
  {
    id: "deletion",
    title: "9. Account and data deletion",
    paragraphs: [
      "To delete your account in the app, open Settings and select \"Delete Account and Data.\" This sends a deletion request to the FlexiWalls service and removes the account and associated server-side data that is not required to be retained by law or for legitimate security, fraud-prevention, transaction, or dispute purposes.",
      "You may also request account or data deletion by emailing support.flexiwalls@gmail.com with the subject \"FlexiWalls Account Deletion Request.\" Include the email address associated with your FlexiWalls account. We may ask you to verify account ownership before completing the request.",
      "Deleting your FlexiWalls account does not automatically remove wallpaper files already saved on your device and does not automatically cancel a Google Play subscription. Remove downloaded files from the app or gallery and manage subscriptions through Google Play.",
    ],
  },
  {
    id: "rights",
    title: "10. Your choices and privacy rights",
    items: [
      { text: "Request access to personal information associated with your account." },
      { text: "Request correction of inaccurate account information." },
      { text: "Request deletion of your account and associated personal information." },
      { text: "Disable optional permissions through Android settings." },
      { text: "Turn notifications or Wi-Fi-only downloads on or off in the app." },
      { text: "Log out and revoke FlexiWalls access through your Google Account settings." },
      { text: "Manage or cancel subscriptions through Google Play." },
      { text: "Reset or delete your Android advertising ID and manage available ad privacy settings on your device or Google account." },
      {
        text: "We may need to verify your identity before completing a request. Some information may be retained when required by law or needed for security, fraud prevention, transaction records, or dispute resolution.",
      },
    ],
  },
  {
    id: "security",
    title: "11. Security and international processing",
    paragraphs: [
      "We use safeguards such as HTTPS, authentication, access controls, secure device storage where supported, and restricted access to production services. No app, database, or internet transmission can be guaranteed completely secure.",
      "Information may be processed in India and in other countries where our service providers operate. Those locations may have data-protection laws different from those in your country.",
    ],
  },
  {
    id: "children",
    title: "12. Children’s privacy",
    paragraphs: [
      "FlexiWalls is not specifically directed to children under 13 or the minimum age required by applicable local law. We do not knowingly collect personal information from children in a manner that violates applicable law.",
      "Where parental or guardian consent is required, a child should not create an account, view personalized advertising, or make a purchase without that consent. A parent or guardian who believes a child provided personal information may contact us to request review and deletion.",
    ],
  },
  {
    id: "changes",
    title: "13. Changes and contact",
    paragraphs: [
      "We may update this policy when the app, SDKs, service providers, legal requirements, or data practices change. The latest version will show a revised Last updated date. Material changes may also be communicated in the app or by another appropriate method.",
    ],
    items: [
      { label: "Privacy and support email:", text: SUPPORT_EMAIL },
      { label: "Application:", text: APP_NAME },
      { label: "Android package:", text: PACKAGE_NAME },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pb-20 text-white">
      <Navbar />

      <section className="mx-auto max-w-[1100px] px-6 pt-40 md:px-16">
        <p className="font-semibold text-purple-300">Privacy &amp; Security 🔒</p>

        <h1 className="mt-4 text-5xl font-black md:text-7xl">
          Privacy
          <span className="gradient-text block">Policy</span>
        </h1>

        <p className="mt-6 max-w-3xl text-gray-300">
          This policy explains how FlexiWalls handles account, device,
          advertising, purchase, and usage information.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-400">
          <span>Last updated: {LAST_UPDATED}</span>
          <span aria-hidden="true">•</span>
          <a
            className="text-purple-300 underline-offset-4 hover:underline"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {quickFacts.map((fact) => (
            <div key={fact.title} className="glass rounded-[24px] p-6">
              <h2 className="text-lg font-bold">{fact.title}</h2>
              <p className="mt-2 leading-7 text-gray-300">{fact.text}</p>
            </div>
          ))}
        </div>

        <nav
          aria-label="Privacy policy sections"
          className="glass mt-12 rounded-[24px] p-6"
        >
          <h2 className="text-xl font-bold">Contents</h2>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-gray-300 underline-offset-4 hover:text-white hover:underline"
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>

        <article className="mt-10 space-y-8">
          {sections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              className="glass scroll-mt-28 rounded-[30px] p-8"
            >
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 leading-8 text-gray-300 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}

              {section.items ? (
                <ul className="mt-4 space-y-4 text-gray-300">
                  {section.items.map((item, index) => (
                    <li
                      key={`${section.id}-${index}`}
                      className="flex gap-3 leading-8"
                    >
                      <span aria-hidden="true" className="text-purple-300">
                        •
                      </span>
                      <span>
                        {item.label ? (
                          <strong className="text-white">{item.label} </strong>
                        ) : null}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.id === "deletion" ? (
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                    "FlexiWalls Account Deletion Request",
                  )}`}
                  className="mt-6 inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  Request account deletion
                </a>
              ) : null}
            </section>
          ))}
        </article>

        <div className="mt-12 text-sm text-gray-400">
          {APP_NAME} · {PACKAGE_NAME} · Last updated {LAST_UPDATED}
        </div>
      </section>
    </main>
  );
}