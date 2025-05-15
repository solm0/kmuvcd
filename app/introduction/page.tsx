export const metadata = {
  title: "KMUVCD - 학과 소개",
};

import Docs from "../ui/docs/docs";
import DocPage from "../ui/docs/doc-page";

export default async function Page() {
  return(
    <Docs>
      <DocPage />
    </Docs>
  );
}