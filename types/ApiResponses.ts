export interface ThreadsResponse {
  data: {
    post_count: number;
    id: number;
  }[];
}

export interface SingleThread {
  posts: {
    id: number;
    content: string;
    user_id: number;
    posted_date: string;
    user_name: string;
  }[];
  thread_id: number;
  thread_subject: string;
  thread_content: string;
  thread_author: number;
  category_name: string;
  category_id: number;
  posts_count: number;
  thread_author_name: string;
  thread_posted_date: string;
}

export interface SingleCategory {
  data: {
    threads: {
      thread_subject: string;
      thread_content: string;
      thread_posted_date: string;
      thread_id: number;
      user_id: number;
      user_name: string;
      post_count: number;
    }[];
    category_id: number;
    category_name: string;
    thread_count: number;
  };
}

export interface CategoriesResponse {
  data: {
    latest_thread: {
      thread_subject: string;
      recent_thread_posted_date: string;
      thread_id: number;
    };
    id: number;
    name: string;
    thread_count: number;
    user_name: string;
  }[];
}
