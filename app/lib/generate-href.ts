export default function generateHref (
  pathname: string,
  searchParams: string,
  documentId: string,
  subPath: string
) {
  const newParams = new URLSearchParams(searchParams.toString());
  const currentExpand = newParams.get("expand");

  if (currentExpand === "true") {
    newParams.set("expand", "false");
  }

  if (subPath !== documentId) {
    const cleanPathname =  pathname.split('/').slice(0, 2).join('/');
    return `${cleanPathname}/${documentId}?${newParams.toString()}`;
  } else {
    const cleanPathname = pathname.split('/').slice(0, 2).join('/');
    return `${cleanPathname}?${newParams.toString()}`;
  }
}