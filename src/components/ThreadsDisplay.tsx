import date from "date-and-time";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import { SingleCategory } from "../../types/ApiResponses";
import { useAuth } from "@/context/AuthContext";
import EditOrDeleteThread from "./EditOrDeleteThread";

export default function ThreadsDisplay({
  threads,
}: {
  threads: SingleCategory["data"];
}) {
  const { user } = useAuth();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Thread Author</th>
          <th>Posts</th>
        </tr>
      </thead>
      <tbody>
        {threads.threads.map((thread) => {
          const postedDate = new Date(thread.thread_posted_date);
          const formattedDate = date.format(postedDate, "DD/MM/YY hh:mm A");
          const isAdminOrSameUser =
            thread.user_id === user?.user_id || user?.is_admin;

          return (
            <tr key={thread.thread_id}>
              <td
                style={{
                  position: "relative",
                }}
              >
                <a
                  style={{ all: "unset", cursor: "pointer" }}
                  href={`/thread/${thread.thread_id}/1`}
                >
                  {thread.thread_subject}
                </a>
                {isAdminOrSameUser && <EditOrDeleteThread thread={thread} />}
              </td>
              <td>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{ cursor: "pointer" }}>
                    {thread.user_name}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: ".6rem" }}>
                    {formattedDate}
                  </ListGroup.Item>
                </ListGroup>
              </td>
              <td>{thread.post_count}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
