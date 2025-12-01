'use client';

import { createPortal } from 'react-dom';
import style from './modal.module.css';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog
      className={style.modal}
      ref={dialogRef}
      onClick={e => {
        // 모달의 배경을 클릭하면 -> 뒤로가기
        if ((e.target as HTMLElement).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      onClose={() => router.back()}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}
