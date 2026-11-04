import type { Parent, Root, RootContent, Text } from "mdast";

function expandStrong(node: Text, source: string): RootContent[] {
  const { start, end } = node.position ?? {};
  if (
    start?.offset === undefined ||
    end?.offset === undefined ||
    source.slice(start.offset, end.offset) !== node.value
  ) {
    return [node];
  }

  // Extend emphasis only for literal text that ends in a parenthesis
  // immediately before a Korean suffix. Escapes and entities stay as parsed.
  const pattern = /(?<!\*)\*\*(?![\s*])([^*\r\n]*[)）])\*\*(?=[가-힣])/g;
  const children: RootContent[] = [];
  let offset = 0;

  for (let match = pattern.exec(node.value); match; match = pattern.exec(node.value)) {
    if (match.index > offset) {
      children.push({ type: "text", value: node.value.slice(offset, match.index) });
    }
    children.push({
      type: "strong",
      children: [{ type: "text", value: match[1] }],
    });
    offset = match.index + match[0].length;
  }

  if (!offset) return [node];
  if (offset < node.value.length) {
    children.push({ type: "text", value: node.value.slice(offset) });
  }
  return children;
}

export function remarkKoreanStrong() {
  return (tree: Root, file: { toString(): string }) => {
    const source = file.toString();
    const expand = (parent: Parent) => {
      parent.children = parent.children.flatMap((child) => {
        if (child.type === "text") return expandStrong(child, source);
        if ("children" in child) expand(child);
        return [child];
      });
    };
    expand(tree);
  };
}
