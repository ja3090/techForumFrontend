import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import { Container } from "react-bootstrap";
import { CategoriesResponse } from "../../types/ApiResponses";
import date from "date-and-time";
import { useRouter } from "next/router";

export default function CategoriesDisplay({
  categories,
}: {
  categories: CategoriesResponse["data"];
}) {
  const router = useRouter();

  return (
    <>
      <Container>
        <h3 style={{ margin: "2rem 0" }}>Forum Categories</h3>
      </Container>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Thread</th>
              <th>Threads</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const postedDate = new Date(
                category.latest_thread.recent_thread_posted_date
              );
              const formattedDate = date.format(postedDate, "DD/MM/YY hh:mm A");

              return (
                <tr key={category.id}>
                  <td
                    onClick={() => {
                      router.push(`/categories/${category.id}/1`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {category.name}
                  </td>
                  <td>
                    <ListGroup variant="flush">
                      <ListGroup.Item style={{ cursor: "pointer" }}>
                        {category.latest_thread.thread_subject}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: ".6rem" }}>
                        by {category.user_name} | {formattedDate}
                      </ListGroup.Item>
                    </ListGroup>
                  </td>
                  <td>{category.thread_count}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
