// server action
'use server';

import { revalidatePath } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  console.log('server action called');
  console.log(formData);

  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  // 예외처리
  if (!bookId || !content || !author) {
    return;
  }

  // api 호출
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ content, author, bookId }),
    });

    if (!response.ok) {
      return;
    }
    console.log(response.status);

    revalidatePath(`/book/${bookId}`); // 성공하면 바로 방금 추가한 리뷰 보이게 하기 위해 재검증(서버 측에서만 호출 가능! - 서버컴포넌트이거나 'use server' 함수 내에서만 호출 가능)
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
