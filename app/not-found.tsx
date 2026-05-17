import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-gray-100">
      <div className="text-center">
        <p className="text-6xl font-bold text-indigo-400">404</p>
        <h1 className="mt-4 text-2xl font-semibold">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-2 text-gray-400">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
