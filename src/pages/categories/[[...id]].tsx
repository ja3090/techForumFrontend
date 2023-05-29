import getSecret from "@/utils/getBackendUrl";
import { CategoriesResponse } from "../../../types/ApiResponses";
import { SingleCategory } from "../../../types/ApiResponses";
import { GetStaticPropsContext } from "next";
import Layout from "@/components/Layout/Layout";
import { Button, Container } from "react-bootstrap";
import Paginate from "@/components/Paginate";
import ThreadsDisplay from "@/components/ThreadsDisplay";
import { useState } from "react";
import CreateThreadModal from "@/components/Modals/CreateThreadModal";

export default function Category({
  threads,
  page,
}: {
  threads: SingleCategory["data"];
  page: number;
}) {
  const totalPages = Math.ceil(threads.thread_count / 10);
  const [showCreateThread, setShow] = useState(false);

  return (
    <Layout title={threads.category_name}>
      <Container style={{ margin: "1rem auto" }}>
        <h3>{threads.category_name}</h3>
        <Button onClick={() => setShow(true)} style={{ margin: "1rem 0" }}>
          Create Thread
        </Button>
      </Container>
      <Container>
        <ThreadsDisplay threads={threads} />
        <Paginate
          totalPages={totalPages}
          currentPage={page}
          url={`/categories/${threads.category_id}`}
        />
      </Container>
      <CreateThreadModal
        categoryId={threads.category_id}
        setShow={setShow}
        show={showCreateThread}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const apiUrl = getSecret();

  const res = await fetch(`${apiUrl}/api/categories`, {
    headers: {
      Accept: "application/json",
    },
  });

  const { data: categories }: { data: CategoriesResponse["data"] } =
    await res.json();

  const paths = categories
    .map((category) => {
      const totalPages = { length: Math.ceil(category.thread_count / 10) };

      if (totalPages.length) {
        return Array.from(totalPages, (x, i) => ({
          params: { id: [String(category.id), `${i + 1}`] },
        }));
      }

      return { params: { id: [String(category.id), "1"] } };
    })
    .flat();

  return { paths, fallback: false };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const apiUrl = getSecret();
  const { params } = ctx;

  if (!params?.id || !Array.isArray(params.id)) {
    return {
      notFound: true,
    };
  }

  const [category, page] = params?.id;

  const res = await fetch(`${apiUrl}/api/categories/${category}/${page}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const { data: threads } = await res.json();

  if (!threads) {
    return {
      notFound: true,
    };
  }

  return { props: { threads, page: Number(page) }, revalidate: 5 };
}
