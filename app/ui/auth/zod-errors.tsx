export function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={`${err}-${index}`} className="text-red-500 text-xs mt-1 py-2">
      {err}
    </div>
  ));
}