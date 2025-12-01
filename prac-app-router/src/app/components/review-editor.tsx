'use client';

import { createReviewAction } from '@/actions/create-review.action';
import style from './review-editor.module.css';
import { useActionState, useEffect } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  // useActionState -> server action을 클라이언트 측에서 사용할 수 있게 해주는 hook
  // const[form의 상태, form의 액션, form의 로딩 상태]= useActionState(action함수, 초기상태값)
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  });

  return (
    <section>
      <form action={formAction} className={style.form_container}>
        <input hidden name='bookId' value={bookId} readOnly />

        <textarea name='content' placeholder='review content' required disabled={isPending} />
        <div className={style.submit_container}>
          <input type='text' name='author' placeholder='author' required disabled={isPending} />
          <button type='submit' disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </section>
  );
}
