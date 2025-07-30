export function groupPagesByFile(
  items: { mdaFile?: string; mdaPageNo?: number }[]
) {
  const grouped = items
    .filter((i) => i.mdaFile && Number.isInteger(i.mdaPageNo))
    .reduce<Record<string, Set<number>>>((acc, { mdaFile, mdaPageNo }) => {
      const file = mdaFile!;
      const page = mdaPageNo!;
      if (!acc[file]) acc[file] = new Set();
      acc[file].add(page);
      return acc;
    }, {});

  return Object.entries(grouped).map(([mdaFile, pages]) => {
    const allPages = new Set([1, 2, ...pages]); // Ensure 1 and 2 are always included
    return {
      mdaFile,
      pages: Array.from(allPages).sort((a, b) => a - b),
    };
  });
}
