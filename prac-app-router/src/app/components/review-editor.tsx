import { createReviewAction } from '@/actions/create-review.action';
import style from './review-editor.module.css';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction} className={style.form_container}>
        <input hidden name='bookId' value={bookId} readOnly />

        <textarea name='content' placeholder='review content' required />
        <div className={style.submit_container}>
          <input type='text' name='author' placeholder='author' required />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </section>
  );
}
