'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, User, Calendar, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { Comment } from './comment-form';
import { formatDate } from '@/lib/utils';
import CommentForm from './comment-form';

interface CommentListProps {
  postSlug: string;
  onCommentAdded: (comment: Comment) => void;
}

interface CommentItemProps {
  comment: Comment;
  postSlug: string;
  showReplyForm: string | null;
  showReplies: Set<string>;
  onReplyClick: (commentId: string) => void;
  onReplySubmit: (comment: Comment) => void;
  onReplyCancel: () => void;
  onToggleReplies: (commentId: string) => void;
}

export default function CommentList({ postSlug, onCommentAdded }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState<Set<string>>(new Set());

  useEffect(() => {
    // 로컬 스토리지에서 댓글 로드
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const postComments = storedComments.filter((comment: Comment) => comment.postSlug === postSlug);
    
    // 댓글을 계층 구조로 정리
    const organizedComments = organizeComments(postComments);
    setComments(organizedComments.sort((a: Comment, b: Comment) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [postSlug]);

  // 댓글을 계층 구조로 정리하는 함수
  const organizeComments = (comments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    // 모든 댓글을 맵에 저장
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // 댓글을 계층 구조로 정리
    comments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id)!;
      
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies = parent.replies || [];
          parent.replies.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    return rootComments;
  };

  useEffect(() => {
    // 댓글 추가 이벤트 리스너
    const handleCommentAdded = (comment: Comment) => {
      if (comment.postSlug === postSlug) {
        const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
        const updatedComments = [...storedComments, comment];
        const organizedComments = organizeComments(updatedComments);
        setComments(organizedComments.sort((a: Comment, b: Comment) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }
    };

    // 커스텀 이벤트 리스너 등록
    window.addEventListener('commentAdded', ((e: CustomEvent) => {
      handleCommentAdded(e.detail);
    }) as EventListener);

    return () => {
      window.removeEventListener('commentAdded', ((e: CustomEvent) => {
        handleCommentAdded(e.detail);
      }) as EventListener);
    };
  }, [postSlug]);

  const handleReplyClick = (commentId: string) => {
    setShowReplyForm(showReplyForm === commentId ? null : commentId);
  };

  const handleReplySubmit = (comment: Comment) => {
    onCommentAdded(comment);
    setShowReplyForm(null);
  };

  const handleReplyCancel = () => {
    setShowReplyForm(null);
  };

  const toggleReplies = (commentId: string) => {
    const newShowReplies = new Set(showReplies);
    if (newShowReplies.has(commentId)) {
      newShowReplies.delete(commentId);
    } else {
      newShowReplies.add(commentId);
    }
    setShowReplies(newShowReplies);
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          첫 번째 댓글을 작성해보세요!
        </h3>
        <p className="text-sm text-muted-foreground">
          여러분의 의견과 피드백을 기다리고 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-lg font-semibold">댓글 {comments.length}개</h3>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postSlug={postSlug}
            showReplyForm={showReplyForm}
            showReplies={showReplies}
            onReplyClick={handleReplyClick}
            onReplySubmit={handleReplySubmit}
            onReplyCancel={handleReplyCancel}
            onToggleReplies={toggleReplies}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 개별 댓글 아이템 컴포넌트
 * @description 댓글과 대댓글을 렌더링하는 컴포넌트
 */
function CommentItem({
  comment,
  postSlug,
  showReplyForm,
  showReplies,
  onReplyClick,
  onReplySubmit,
  onReplyCancel,
  onToggleReplies
}: CommentItemProps) {
  const hasReplies = comment.replies && comment.replies.length > 0;
  const isShowingReplies = showReplies.has(comment.id);
  const isShowingReplyForm = showReplyForm === comment.id;

  return (
    <div className="space-y-4">
      <Card className={`border-l-4 border-l-primary ${comment.depth > 0 ? 'ml-4 sm:ml-8' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{comment.name}</span>
              {comment.email && (
                <Badge variant="outline" className="text-xs">
                  {comment.email}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(comment.date)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-foreground whitespace-pre-wrap leading-relaxed mb-4">
            {comment.content}
          </p>
          
          {/* 댓글 액션 버튼들 */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReplyClick(comment.id)}
              className="text-xs"
            >
              <Reply className="h-3 w-3 mr-1" />
              답글
            </Button>
            
            {hasReplies && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleReplies(comment.id)}
                className="text-xs"
              >
                {isShowingReplies ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    답글 숨기기
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    답글 보기 ({comment.replies?.length})
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 대댓글 폼 */}
      {isShowingReplyForm && (
        <div className="ml-4 sm:ml-8">
          <CommentForm
            postSlug={postSlug}
            onCommentSubmit={onReplySubmit}
            parentId={comment.id}
            onCancel={onReplyCancel}
            isReply={true}
          />
        </div>
      )}

      {/* 대댓글 목록 */}
      {hasReplies && isShowingReplies && (
        <div className="ml-4 sm:ml-8 space-y-4">
          {comment.replies?.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postSlug={postSlug}
              showReplyForm={showReplyForm}
              showReplies={showReplies}
              onReplyClick={onReplyClick}
              onReplySubmit={onReplySubmit}
              onReplyCancel={onReplyCancel}
              onToggleReplies={onToggleReplies}
            />
          ))}
        </div>
      )}
    </div>
  );
}
