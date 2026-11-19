import Layout from '@theme/Layout';
import Hero from '@site/src/components/hero';
import Header from '@site/src/components/header';
import Skills from '@site/src/components/skills';

export default function Home(): JSX.Element {
  return (
    <Layout
      wrapperClassName="homepage"
      title="Werner Raatz – DevSecOps Engineer"
      description="Portfolio of Werner Raatz, DevSecOps Engineer and software tester.">
      <Header />
      <main>
        <Hero />
        <Skills />
      </main>
    </Layout>
  );
}
