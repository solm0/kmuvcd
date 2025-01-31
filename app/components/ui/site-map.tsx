'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from 'clsx';

const categories = [
  { name: '기타',
    lists: [
      { name: '대시보드', href: '/' },
      { name: '내 프로필', href: '/myprofile' },
      { name: '회원가입', href: '/signin' }
    ]
  },
  { name: '소개',
    lists: [
      { name: '목표', href: '/mission'},
      { name: '역사', href: '/history'}
    ]
  },
  { name: '교육',
    lists: [
      { name: '교수진', href: '/professors'},
      { name: '커리큘럼', href: '/curriculum'},
      { name: '대학원', href: '/grad_schools'},
      { name: '국제교류', href: '/international'}
    ]
  },
  { name: '학생 지원',
    lists: [
      { name: '학생회', href: '/student_councils'},
      { name: '교직원', href: '/staffs'},
      { name: '시설', href: '/facility'},
      { name: '동아리', href: '/clubs'}
    ]
  },
  { name: '학사 정보',
    lists: [
      { name: '졸업 요건', href: '/graduation'},
      { name: '복/부전공 요건', href: '/major'}
    ]
  },
  { name: '전시',
    lists: [
      { name: '전시', href: '/exhibition'}
    ]
  },
  { name: '공지',
    lists: [
      { name: '공지', href: '/notices'}
    ]
  },
  { name: '각종 신청/문의',
    lists: [
      { name: '이벤트', href: '/events'},
      { name: '시설', href: '/workplaces'},
      { name: '동아리/서클', href: '/clubs_detail'}
    ]
  }
]

export default function SiteMap() {
  const pathname = usePathname();
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((category) => (
        <ul key={category.name || 'default'}>
          {category.name && <p>{category.name}</p>}
          {category.lists.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 mb-2",
                  {
                    'bg-sky-100 text-blue-600': pathname === link.href,
                  },
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}