import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { editPost } from "@/services/dbService";
import { SingleThread } from "../../../types/ApiResponses";

export default function EditPostModal({
  show,
  setShow,
  post,
}: {
  show: boolean;
  setShow: (arg: boolean) => void;
  post: SingleThread["posts"][number];
}) {
  const { user } = useAuth();

  const [error, setError] = useState<any | null>(null);
  const [form, setForm] = useState({
    postId: post.id,
    content: post.content,
  });
  const { postId, content } = form;

  const editHandler = ({
    token,
    content,
  }: {
    token: string;
    content: string;
  }) => {
    editPost({
      postId,
      token,
      content,
    })
      .then(() => setShow(false))
      .catch((err) => {
        setError(err?.response?.data ?? null);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  return (
    <Modal show={show}>
      <Modal.Header>Reply</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              onChange={(e) => {
                setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
              }}
              as="textarea"
              name="content"
              value={content}
            />
            {error?.errors?.content && (
              <Form.Text style={{ color: "red" }}>
                {error?.errors?.content}
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => editHandler({ token: user?.token as string, content })}
          type="submit"
        >
          Submit
        </Button>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
