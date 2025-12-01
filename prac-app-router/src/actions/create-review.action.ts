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

    // 재검증 - revalidatePath

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`); // 성공하면 바로 방금 추가한 리뷰 보이게 하기 위해 재검증(서버 측에서만 호출 가능! - 서버컴포넌트이거나 'use server' 함수 내에서만 호출 가능)

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    revalidatePath('/book/[id]', 'page');

    // 3. 특정 레이아웃을 가지는 모든 페이지를 재검증
    // revalidatePath('/(with-searchbar)', 'layout');

    // 4. 모든 데이터 재검증 -> index 경로에 있는 레이아웃인 루트 레이아웃을 갖는 모든 페이지를 모두 재검증!
    // revalidatePath('/', 'layout');

    // 5. 태그를 가지는 모든 페이지를 재검증 -- reviewList API 호출 시 태그를 추가해서 재검증 가능!
    // revalidateTag(`review-${bookId}`);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
