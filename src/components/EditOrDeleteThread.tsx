import { Dropdown } from "react-bootstrap";
import EditThreadModal from "./Modals/EditThreadModal";
import { SingleCategory } from "../../types/ApiResponses";
import { useState } from "react";
import ConfirmDeleteThread from "./Modals/ConfirmDeleteThread";
import { useAuth } from "@/context/AuthContext";

export default function EditOrDeleteThread({
  thread,
}: {
  thread: SingleCategory["data"]["threads"][number];
}) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const isAuthor = user?.user_id === thread.user_id;

  return (
    <Dropdown style={{ position: "absolute", top: "1%", right: "1%" }}>
      {isAuthor && (
        <EditThreadModal show={show} setShow={setShow} thread={thread} />
      )}
      <ConfirmDeleteThread
        show={showDelete}
        setShow={setShowDelete}
        threadId={thread.thread_id}
      />
      <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>

      <Dropdown.Menu>
        {isAuthor && (
          <Dropdown.Item onClick={() => setShow(true)}>Edit</Dropdown.Item>
        )}
        <Dropdown.Item onClick={() => setShowDelete(true)}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
