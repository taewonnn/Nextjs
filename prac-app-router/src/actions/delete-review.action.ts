'use server';

import { revalidateTag } from 'next/cache';

export async function deleteReviewAction(_: any, formData: FormData) {
  console.log(formData);

  const bookId = formData.get('bookId')?.toString();
  const reviewId = formData.get('id')?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: 'review id is required',
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${reviewId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`리뷰 삭제에 실패했습니다! -  ${response.statusText}`);
    }

    revalidateTag(`/book/${bookId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다! -  ${error}`,
    };
  }
}
