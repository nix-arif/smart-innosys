export function groupPagesByFile(
  items: { mdaFile?: string; mdaPageNo?: number }[]
) {
  const grouped = items
    .filter((i) => i.mdaFile && Number.isInteger(i.mdaPageNo))
    .reduce<Record<string, Set<number>>>((acc, { mdaFile, mdaPageNo }) => {
      acc[mdaFile!] = acc[mdaFile!] || new Set();
      acc[mdaFile!]!.add(mdaPageNo!);
      return acc;
    }, {});
  const resultingFile = Object.entries(grouped).map(([mdaFile, pages]) => ({
    mdaFile,
    pages: Array.from(pages).sort((a, b) => a - b),
  }));

  const newResultingFile = resultingFile.map((item) => {
    return {
      ...item,
      pages: [1, 2, ...item.pages],
    };
  });
  return newResultingFile;
}
