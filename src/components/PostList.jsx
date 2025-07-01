import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('投稿の取得に失敗しました:', error);
      });
  }, []);

  return (
    <div>
      <h2>投稿一覧</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <p><strong>ユーザー名:</strong> {post.userName}</p>
            <p><strong>内容:</strong> {post.content}</p>
            <p><strong>作成日時:</strong> {post.createdAt}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
