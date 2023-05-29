import Pagination from "react-bootstrap/Pagination";
import { useRouter } from "next/router";

export default function Paginate({
  totalPages,
  currentPage,
  url,
}: {
  totalPages: number;
  currentPage: number;
  url: `/${string}/${number}`;
}) {
  const router = useRouter();

  return (
    <Pagination>
      {Array.from({ length: totalPages }, (x, i) => (
        <Pagination.Item
          onClick={() => {
            if (i + 1 === currentPage) return;
            router.push(`${url}/${i + 1}`);
          }}
          active={currentPage === i + 1}
          key={i + 1}
        >
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}
