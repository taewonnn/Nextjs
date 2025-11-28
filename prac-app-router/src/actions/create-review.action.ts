// server action
'use server';

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
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
