import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { postThread } from "@/services/dbService";

export default function CreateThreadModal({
  show,
  setShow,
  categoryId,
}: {
  show: boolean;
  setShow: (arg: boolean) => void;
  categoryId: number;
}) {
  const { user } = useAuth();

  const [error, setError] = useState<any | null>(null);
  const [form, setForm] = useState({
    category_id: categoryId,
    subject: "",
    content: "",
  });
  const { category_id, subject, content } = form;

  const postHandler = ({
    category_id,
    token,
    subject,
    content,
  }: {
    category_id: number;
    token: string;
    subject: string;
    content: string;
  }) => {
    postThread({
      category_id,
      token,
      subject,
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
      <Modal.Header>Post Thread</Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={() =>
            postHandler({
              category_id,
              token: user?.token as string,
              subject,
              content,
            })
          }
        >
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              onChange={(e) => {
                setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
              }}
              name="subject"
            />
            {error?.errors?.subject && (
              <Form.Text style={{ color: "red" }}>
                {error?.errors?.subject}
              </Form.Text>
            )}
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
          onClick={() =>
            postHandler({
              category_id,
              token: user?.token as string,
              subject,
              content,
            })
          }
          type="submit"
        >
          Submit
        </Button>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
