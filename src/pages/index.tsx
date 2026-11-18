import Layout from '@theme/Layout';
import Hero from '@site/src/components/hero';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Werner Raatz – DevSecOps Engineer"
      description="Portfolio of Werner Raatz, DevSecOps Engineer and software tester.">
      <main>
        <Hero />
      </main>
    </Layout>
  );
}
