'use client';

import { useState } from 'react';
import CommentForm, { Comment } from './comment-form';
import CommentList from './comment-list';

interface CommentsSectionProps {
  postSlug: string;
}

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState<Comment | null>(null);

  const handleCommentSubmit = (comment: Comment) => {
    setNewComment(comment);
    
    // 커스텀 이벤트 발생
    const event = new CustomEvent('commentAdded', { detail: comment });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-8">
      <CommentForm postSlug={postSlug} onCommentSubmit={handleCommentSubmit} />
      <CommentList postSlug={postSlug} onCommentAdded={setNewComment} />
    </div>
  );
}
