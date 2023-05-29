import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { editThread } from "@/services/dbService";
import { SingleCategory } from "../../../types/ApiResponses";

export default function EditThreadModal({
  show,
  setShow,
  thread,
}: {
  show: boolean;
  setShow: (arg: boolean) => void;
  thread: SingleCategory["data"]["threads"][number];
}) {
  const { user } = useAuth();

  const [error, setError] = useState<any | null>(null);
  const [form, setForm] = useState({
    threadId: thread.thread_id,
    content: thread.thread_content,
    subject: thread.thread_subject,
  });
  const { subject, threadId, content } = form;

  const editHandler = ({
    token,
    content,
    subject,
  }: {
    token: string;
    content: string;
    subject: string;
  }) => {
    editThread({
      threadId,
      token,
      content,
      subject,
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
            <Form.Label>Subject</Form.Label>
            <Form.Control
              onChange={(e) => {
                setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
              }}
              name="subject"
              value={subject}
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
          onClick={() =>
            editHandler({ token: user?.token as string, content, subject })
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
