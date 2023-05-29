import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
("use client");

export default function LoginModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (arg: boolean) => void;
}) {
  const { loginHandler, error } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  return (
    <Modal show={show}>
      <Modal.Header>Log In</Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler({ email, password, setShow });
          }}
        >
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) =>
                setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
              }
              name="email"
              type="email"
            />
            {error?.errors?.email && (
              <Form.Text style={{ color: "red" }}>
                {error?.errors?.email}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) =>
                setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
              }
              name="password"
              type="password"
            />
            {error?.errors?.password && (
              <Form.Text style={{ color: "red" }}>
                {error?.errors?.password}
              </Form.Text>
            )}
          </Form.Group>
          <button style={{ all: "unset" }} type="submit"></button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(e) => {
            e.preventDefault();
            loginHandler({ email, password, setShow });
          }}
          type="submit"
        >
          Submit
        </Button>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
