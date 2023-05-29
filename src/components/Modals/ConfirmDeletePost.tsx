import { useAuth } from "@/context/AuthContext";
import { deletePost } from "@/services/dbService";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function ConfirmDeleteThread({
  show,
  setShow,
  postId,
}: {
  show: boolean;
  setShow: (arg: boolean) => void;
  postId: number;
}) {
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const deleteHandler = ({ token }: { token: string }) => {
    deletePost({
      postId,
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
      <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
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
