import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Board',
};

export default async function Board() {
  return (
    <div>뭔가가 계속 업데이트되는 곳.</div>
  );
}