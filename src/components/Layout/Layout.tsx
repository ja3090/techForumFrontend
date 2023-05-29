import Head from "next/head";
import Header from "./Header";

export default function Layout({
  title,
  keywords,
  description,
  children,
}: {
  title: string;
  keywords: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{title + " | Web Development Forum"}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {children}
    </>
  );
}

Layout.defaultProps = {
  keywords: "technology JavaScript Go Front-End Back-End C# PHP Devops Linux",
  description:
    "Web Development Forum made using Next.js with a PHP/Laravel backend.",
};
