// PostFormPresenter.tsx
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface Props {
  authorId: string;
  onAuthorIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  content: string;
  onContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  youtubeUrl: string;
  onYoutubeUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const PostFormPresenter = ({
  authorId,
  onAuthorIdChange,
  title,
  onTitleChange,
  content,
  onContentChange,
  youtubeUrl,
  onYoutubeUrlChange,
  onSubmit,
}: Props): JSX.Element => (
  <form onSubmit={onSubmit}>
    <TextField
      value={authorId}
      onChange={onAuthorIdChange}
      label="작성자 ID"
      fullWidth
    />
    <TextField value={title} onChange={onTitleChange} label="제목" fullWidth />
    <TextField
      value={content}
      onChange={onContentChange}
      label="내용"
      fullWidth
    />
    <TextField
      value={youtubeUrl}
      onChange={onYoutubeUrlChange}
      label="유튜브 URL"
      fullWidth
    />
    <Button type="submit">게시글 작성</Button>
  </form>
);

export default PostFormPresenter;
