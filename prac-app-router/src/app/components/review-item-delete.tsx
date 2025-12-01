'use client';
import { deleteReviewAction } from '@/actions/delete-review.action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDelete({ reviewId, bookId }: { reviewId: number; bookId: number }) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <input type='text' name='bookId' value={bookId} hidden readOnly />
      <input type='text' name='id' value={reviewId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()} role='button'>
          삭제하기
        </div>
      )}
    </form>
  );
}
