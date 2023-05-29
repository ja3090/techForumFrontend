import { GetStaticProps } from "next";
import getSecret from "../utils/getBackendUrl";
import { CategoriesResponse } from "../../types/ApiResponses";
import CategoriesDisplay from "@/components/CategoriesDisplay";
import Layout from "@/components/Layout/Layout";

export default function Home({
  categories,
}: {
  categories: CategoriesResponse["data"];
}) {
  return (
    <Layout title="Home">
      <CategoriesDisplay categories={categories} />
    </Layout>
  );
}

export async function getStaticProps(ctx: GetStaticProps) {
  const apiUrl = getSecret();
  const res = await fetch(`${apiUrl}/api/categories`);

  const { data } = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { categories: data },
  };
}
