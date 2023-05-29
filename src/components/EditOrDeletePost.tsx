import { Dropdown } from "react-bootstrap";
import EditPostModal from "./Modals/EditPostModal";
import { useState } from "react";
import ConfirmDeletePost from "./Modals/ConfirmDeletePost";
import { SingleThread } from "../../types/ApiResponses";
import { useAuth } from "@/context/AuthContext";

export default function EditOrDeletePost({
  post,
}: {
  post: SingleThread["posts"][number];
}) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const isAuthor = user?.user_id === post.user_id;

  return (
    <Dropdown
      style={{
        position: "absolute",
        top: "1%",
        right: "0",
        width: "fit-content",
      }}
    >
      {isAuthor && <EditPostModal show={show} setShow={setShow} post={post} />}
      <ConfirmDeletePost
        show={showDelete}
        setShow={setShowDelete}
        postId={post.id}
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
