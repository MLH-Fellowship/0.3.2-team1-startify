import { useRouter, NextRouter } from 'next/router';

import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Header,
  Footer,
  Hero,
  FirstRow,
  SecondRow,
  ThirdRow,
} from '../../components';
import { getFakeData } from '../../core/faker';

const isRouterReady = (router: NextRouter) => {
  return router.asPath !== router.route;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Home() {
  const router = useRouter();
  if (!isRouterReady(router)) {
    return <p> Loading </p>;
  }

  const { seed, t } = router.query;
  const fakeData = getFakeData(+seed, +t);

  if (!fakeData) {
    return <p> Loading </p>;
  }

  const getSecondRowData = () => {
    const { companyBs, illustrations } = fakeData;
    if (!companyBs) return [];

    return companyBs.map((data, idx) => ({
      imageSrc: illustrations[idx + 1],
      title: data?.title,
      bodyText: data?.bodyText.substring(0, 200),
    }));
  };

  return (
    <div className="container">
      <Head>
        <title>{fakeData.companyName}</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <Header name={fakeData.companyName} type={fakeData.companyType} />
      <Hero image={fakeData.images[0]} />
      <FirstRow
        titleText={fakeData.companyCatchPhrase[0].title}
        firstText={fakeData.companyCatchPhrase[0].bodyText?.substr(0, 100)}
        secondText={fakeData?.companyCatchPhrase[2].bodyText}
        imageSrc={fakeData?.illustrations[0]}
      />
      <SecondRow data={getSecondRowData()} />
      <ThirdRow
        title={fakeData?.companyCatchPhrase[1].title}
        bodyText={fakeData?.companyCatchPhrase[1].bodyText}
        imageSrc={fakeData?.images[1]}
      />
      <Footer
        companyName={fakeData.companyName}
        quote={fakeData?.companyCatchPhrase[2].title}
        address={fakeData.address}
        phoneNumber={fakeData.phoneNumber}
        person={fakeData.person}
      />
    </div>
  );
}

export default Home;
