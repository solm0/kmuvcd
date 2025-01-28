import Button from "./button";

export default function SideNav() {
  return (
    <table className="w-full border-collapse border border-gray-300 text-left">
        <tbody>
          <tr>
            <td rowSpan={7} className="border border-gray-300 px-4 py-2">소개</td>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="학과 소개" href="/department" /> 
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="시설 소개" href="/facility" />
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className="border border-gray-300 px-4 py-2">조직 소개</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="교수진" href="/professors" />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
            <Button text="교직원" href="/staffs" />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
            <Button text="학생회" href="/student_councils" />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="동아리 소개" href="/clubs" />
            </td>
          </tr>

          <tr>
            <td rowSpan={1} className="border border-gray-300 px-4 py-2">전시</td>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="전시" href="/exhibition" />
            </td>
          </tr>

          <tr>
            <td rowSpan={4} className="border border-gray-300 px-4 py-2">교육</td>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="교육과정" href="/curriculum" /> 
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="졸업요건" href="/graduation" />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="복/부전공" href="/major" />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
            <Button text="대학원" href="/grad_schools" />
            </td>
          </tr>

          <tr>
            <td rowSpan={1} className="border border-gray-300 px-4 py-2">공지</td>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="학과 뉴스/공지" href="/notices" />
            </td>
          </tr>

          <tr>
            <td rowSpan={2} className="border border-gray-300 px-4 py-2">활동</td>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="동아리" href="/clubs_detail" /> 
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="이벤트" href="/events" />
            </td>
          </tr>

          <tr>
            <td rowSpan={1} className="border border-gray-300 px-4 py-2">공간</td>
            <td className="border border-gray-300 px-4 py-2">
              <Button text="공간" href="/workplaces" />
            </td>
          </tr>
        </tbody>
      </table>
  );
}