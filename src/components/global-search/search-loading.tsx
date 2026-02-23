export function SearchLoading() {
  return (
    <div className="px-3 py-2 md:px-4 md:py-3">
      <div className="space-y-1 md:space-y-1.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl p-2.5 md:gap-4 md:p-3"
          >
            <div className="mt-0.5 h-8 w-8 shrink-0 animate-pulse rounded-lg bg-muted md:h-10 md:w-10" />
            <div className="flex-1 space-y-2 py-0.5">
              <div
                className="h-3.5 animate-pulse rounded bg-muted"
                style={{ width: `${55 + i * 12}%` }}
              />
              <div
                className="h-3 animate-pulse rounded bg-muted/60"
                style={{ width: `${40 + i * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
