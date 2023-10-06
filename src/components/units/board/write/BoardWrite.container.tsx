// PostFormContainer.jsx
import React, { useState } from "react";
import { Api } from "../../../../commons/axios-types/generated/Api";
import PostFormPresenter from "./BoardWrite.presenter";

const api = new Api();

const PostFormContainer: React.FC = () => {
  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await api.api.createPost({
        id: Number(authorId), // authorId 값을 숫자로 변환
        title,
        content,
        youtubeUrl,
      });
      alert("게시물이 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error(error);
      alert("게시물 등록에 실패했습니다.");
    }
  };

  return (
    <PostFormPresenter
      authorId={authorId}
      onAuthorIdChange={(e) => {
        setAuthorId(e.target.value);
      }}
      title={title}
      onTitleChange={(e) => {
        setTitle(e.target.value);
      }}
      content={content}
      onContentChange={(e) => {
        setContent(e.target.value);
      }}
      youtubeUrl={youtubeUrl}
      onYoutubeUrlChange={(e) => {
        setYoutubeUrl(e.target.value);
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default PostFormContainer;
