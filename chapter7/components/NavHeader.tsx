import { usePathname, useRouter } from "next/navigation";

export default function NavHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isCurrent = (path: string) => pathname === path ? 'page' : undefined;

  return (
    <nav>
      <button aria-current={isCurrent('/posts')} onClick={() => router.push('/posts')}>Move to Posts</button>
      <button aria-current={isCurrent('/setting')} onClick={() => router.push('/setting')}>Move to Setting</button>
    </nav>
  )
}