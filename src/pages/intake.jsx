import Head from "next/head";
import Header from "@/components/Header";
import IntakeForm from "@/components/IntakeForm";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import en from "@/i18n/en.json";

const navLabels = {
  home: "Home",
  method: "Coaching",
  coachingGroup: "Group Coaching",
  coachingIndividual: "1:1 Coaching",
  coachingPremium: "Premium In-Person",
  coachingDigital: "Digital Product",
  join: "Join",
  contact: "Contact"
};

export default function IntakePage() {
  const navItems = [
    { label: navLabels.home, href: "/" },
    {
      label: navLabels.method,
      href: "/coaching/group",
      children: [
        { label: navLabels.coachingGroup, href: "/coaching/group" },
        { label: navLabels.coachingIndividual, href: "/coaching/individual" },
        { label: navLabels.coachingPremium, href: "/coaching/premium" },
        { label: navLabels.coachingDigital, href: "/coaching/digital" }
      ]
    },
    { label: navLabels.join, href: "/#join" },
    { label: navLabels.contact, href: "/#contact" }
  ];

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>Client Intake Form — Love Eat Keep Fit</title>
        <meta
          name="description"
          content="Complete your detailed intake form to receive personalized macro and calorie calculations for your coaching plan."
        />
        <meta property="og:title" content="Client Intake Form — Love Eat Keep Fit" />
        <meta
          property="og:description"
          content="Complete your detailed intake form to receive personalized macro and calorie calculations for your coaching plan."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Header navItems={navItems} locale="en" onLocaleChange={() => {}} />

      <main className="pt-10">
        <IntakeForm content={en} />
      </main>

      <Footer footer={en.footer} social={en.social} />
      <ScrollTopButton />
    </div>
  );
}
