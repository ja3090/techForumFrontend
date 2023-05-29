import { useAuth } from "@/context/AuthContext";
import { deleteThread } from "@/services/dbService";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function ConfirmDeleteThread({
  show,
  setShow,
  threadId,
}: {
  show: boolean;
  setShow: (arg: boolean) => void;
  threadId: number;
}) {
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const deleteHandler = ({ token }: { token: string }) => {
    deleteThread({
      threadId,
      token,
    })
      .then(() => setShow(false))
      .catch((err) => {
        setError(err);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  return (
    <Modal show={show}>
      <Modal.Header>Delete</Modal.Header>
      <Modal.Body>Are you sure you want to delete this thread?</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => deleteHandler({ token: user?.token as string })}
          type="submit"
        >
          Submit
        </Button>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
