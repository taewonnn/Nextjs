import BookPage from '@/app/book/[id]/page';
import Modal from '@/app/components/modal';

export default function Page(props: any) {
  return (
    <div>
      <div>가로채기 성공?!!</div>
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
