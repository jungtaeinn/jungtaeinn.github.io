'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, User } from 'lucide-react';

interface CommentFormProps {
  postSlug: string;
  onCommentSubmit: (comment: Comment) => void;
  parentId?: string; // 대댓글 작성 시 부모 댓글 ID
  onCancel?: () => void; // 대댓글 작성 취소 시 호출
  isReply?: boolean; // 대댓글 작성 모드인지 여부
}

export interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
  postSlug: string;
  parentId?: string; // 대댓글의 경우 부모 댓글 ID
  replies?: Comment[]; // 대댓글 배열
  depth: number; // 댓글 깊이 (0: 최상위, 1: 대댓글, 2: 대대댓글)
}

export default function CommentForm({ 
  postSlug, 
  onCommentSubmit, 
  parentId, 
  onCancel, 
  isReply = false 
}: CommentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) return;

    setIsSubmitting(true);

    const newComment: Comment = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      content: formData.content.trim(),
      date: new Date().toISOString(),
      postSlug,
      parentId: parentId || undefined,
      depth: parentId ? 1 : 0,
      replies: []
    };

    // 로컬 스토리지에 저장
    const existingComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const updatedComments = [...existingComments, newComment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));

    // 부모 컴포넌트에 알림
    onCommentSubmit(newComment);

    // 폼 초기화
    setFormData({ name: '', email: '', content: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className={isReply ? "ml-4 sm:ml-8 border-l-2 border-primary/20" : ""}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <User className="h-4 w-4 sm:h-5 sm:w-5" />
          {isReply ? '대댓글 작성' : '댓글 작성'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                이름 *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="이름을 입력하세요"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="이메일을 입력하세요 (선택사항)"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              댓글 *
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={3}
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              placeholder="댓글을 입력하세요..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.name.trim() || !formData.content.trim()}
              className="w-full sm:w-auto text-sm"
            >
              {isSubmitting ? (
                '작성 중...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {isReply ? '대댓글 작성' : '댓글 작성'}
                </>
              )}
            </Button>
            {isReply && onCancel && (
              <Button 
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full sm:w-auto text-sm"
              >
                취소
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
