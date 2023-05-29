import getSecret from "@/utils/getBackendUrl";
import axios from "axios";
const apiUrl = getSecret();

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios.post(`${apiUrl}/api/users/login`, {
    email,
    password,
  });
};

export const postThread = ({
  category_id,
  subject,
  content,
  token,
}: {
  category_id: number;
  subject: string;
  content: string;
  token: string;
}) => {
  return axios.post(
    `${apiUrl}/api/threads`,
    {
      category_id,
      subject,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const editThread = ({
  threadId,
  content,
  token,
  subject,
}: {
  threadId: number;
  content: string;
  subject: string;
  token: string;
}) => {
  return axios.put(
    `${apiUrl}/api/threads/${threadId}`,
    {
      content,
      subject,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteThread = ({
  threadId,
  token,
}: {
  threadId: number;
  token: string;
}) => {
  return axios.delete(`${apiUrl}/api/threads/${threadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postPost = ({
  threadId,
  content,
  token,
}: {
  threadId: number;
  content: string;
  token: string;
}) => {
  return axios.post(
    `${apiUrl}/api/posts/${threadId}`,
    {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const editPost = ({
  postId,
  content,
  token,
}: {
  postId: number;
  content: string;
  token: string;
}) => {
  return axios.put(
    `${apiUrl}/api/posts/${postId}`,
    {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deletePost = ({
  postId,
  token,
}: {
  postId: number;
  token: string;
}) => {
  return axios.delete(`${apiUrl}/api/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logout = (token: string) => {
  return fetch(`${apiUrl}/api/users/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
