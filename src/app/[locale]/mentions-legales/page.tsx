import { siteConfig } from '@/data/site';

export const metadata = {
  title: `Mentions légales | ${siteConfig.name}`,
  description: `Informations légales et RGPD pour ${siteConfig.name}.`,
};

export default async function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-16">
      <h1 className="font-serif text-5xl text-brand-black">Mentions légales</h1>

      <section className="space-y-3">
        <h2 className="font-serif text-3xl text-brand-black">Éditeur du site</h2>
        <p className="font-sans text-sm leading-relaxed text-brand-black/80">
          Le site {siteConfig.name} est édité par {siteConfig.name}, accessible à l&apos;adresse {siteConfig.url}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-3xl text-brand-black">Hébergement</h2>
        <p className="font-sans text-sm leading-relaxed text-brand-black/80">
          Ce site est hébergé par Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, États-Unis.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-3xl text-brand-black">Données personnelles (RGPD)</h2>
        <p className="font-sans text-sm leading-relaxed text-brand-black/80">
          Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre aux demandes.
          Conformément au RGPD, vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en
          écrivant à {siteConfig.email}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-3xl text-brand-black">Cookies</h2>
        <p className="font-sans text-sm leading-relaxed text-brand-black/80">
          Le site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire n&apos;est
          déposé sans consentement explicite.
        </p>
      </section>

      <p className="border-t border-brand-black/10 pt-6 font-sans text-sm text-brand-black/70">
        This page is available in French only as required by French law.
      </p>
    </div>
  );
}
