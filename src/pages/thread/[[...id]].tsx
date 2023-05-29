import getSecret from "@/utils/getBackendUrl";
import { GetStaticPropsContext } from "next";
import Layout from "@/components/Layout/Layout";
import { Button, Col, Container, Row } from "react-bootstrap";
import { SingleThread, ThreadsResponse } from "../../../types/ApiResponses";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Paginate from "@/components/Paginate";
import CreatePostModal from "@/components/Modals/CreatePostModal";
import EditOrDeletePost from "@/components/EditOrDeletePost";
import { useState } from "react";
import dateFormat from "date-and-time";
import { useAuth } from "@/context/AuthContext";

const Post = ({ post }: { post: SingleThread["posts"][number] }) => {
  const postedDate = new Date(post.posted_date);
  const formattedDate = dateFormat.format(postedDate, "DD/MM/YY hh:mm A");

  return (
    <Row
      style={{
        margin: "4rem 0",
        padding: "2rem 0",
        borderRadius: "5px",
        alignItems: "center",
        boxShadow: "0 0 3px 3px #F5F5F5",
      }}
    >
      <Col style={{ paddingTop: "1rem" }}>{post.user_name}</Col>
      <Col style={{ paddingTop: "1rem" }} sm={8}>
        {post.content}
      </Col>
      <Col style={{ paddingTop: "1rem" }}>{formattedDate}</Col>
    </Row>
  );
};

export default function Thread({
  thread,
  page,
}: {
  thread: SingleThread;
  page: number;
}) {
  const { user } = useAuth();
  const totalPages = Math.ceil(thread.posts_count / 10);
  const [showCreatePost, setShow] = useState(false);

  return (
    <Layout title={thread.thread_subject} description={thread.thread_content}>
      <CreatePostModal
        setShow={setShow}
        show={showCreatePost}
        threadId={thread.thread_id}
      />
      <Container>
        <Breadcrumb style={{ margin: "1rem 0" }}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={`/categories/${thread.category_id}/1`}>
            {thread.category_name}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Thread #{thread.thread_id}</Breadcrumb.Item>
        </Breadcrumb>
        <h3 style={{ margin: "1rem 0" }}>{thread.thread_subject}</h3>
        <Button onClick={() => setShow(true)} style={{ margin: "1rem 0 2rem" }}>
          Reply
        </Button>
        <Post
          post={{
            user_name: thread.thread_author_name,
            posted_date: thread.thread_posted_date,
            user_id: thread.thread_author,
            content: thread.thread_content,
            id: thread.thread_id,
          }}
        />
        {thread.posts.map((post) => {
          const isAdminOrAuthor =
            post.user_id === user?.user_id || user?.is_admin;
          return (
            <div key={post.id} style={{ position: "relative" }}>
              <Post post={post} />
              {isAdminOrAuthor && <EditOrDeletePost post={post} />}
            </div>
          );
        })}
        <Paginate
          totalPages={totalPages}
          currentPage={page}
          url={`/threads/${thread.thread_id}`}
        />
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const apiUrl = getSecret();

  const res = await fetch(`${apiUrl}/api/threads`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const { data: threads }: { data: ThreadsResponse["data"] } = await res.json();

  const paths = threads
    .map((thread) => {
      const totalPages = { length: Math.ceil(thread.post_count / 10) };

      if (totalPages.length) {
        return Array.from(totalPages, (x, i) => ({
          params: { id: [String(thread.id), `${i + 1}`] },
        }));
      }

      return { params: { id: [String(thread.id), "1"] } };
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

  const [threadId, page] = params?.id;

  const res = await fetch(`${apiUrl}/api/threads/${threadId}/${page}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const { data: thread } = await res.json();

  if (!thread) {
    return {
      notFound: true,
    };
  }

  return { props: { thread, page: Number(page) }, revalidate: 5 };
}
