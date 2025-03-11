export default function generateHref (
  pathname: string,
  searchParams: string,
  documentId: string
) {
  const newParams = new URLSearchParams(searchParams.toString());
  const currentExpand = newParams.get("expand");

  if (currentExpand === "true") {
    newParams.set("expand", "false");
  }

  if (pathname !== documentId) {
    return `/${documentId}?${newParams.toString()}`;
  } else {
    return `/?${newParams.toString()}`;
  }
}