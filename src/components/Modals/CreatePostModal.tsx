import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { postPost } from "@/services/dbService";

export default function CreatePostModal({
  show,
  setShow,
  threadId,
}: {
  show: boolean;
  setShow: (arg: boolean) => void;
  threadId: number;
}) {
  const { user } = useAuth();

  const [error, setError] = useState<any | null>(null);
  const [form, setForm] = useState({
    threadId,
    content: "",
  });
  const { content } = form;

  const postHandler = ({
    token,
    content,
  }: {
    token: string;
    content: string;
  }) => {
    postPost({
      threadId,
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
          onClick={() => postHandler({ token: user?.token as string, content })}
          type="submit"
        >
          Submit
        </Button>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
