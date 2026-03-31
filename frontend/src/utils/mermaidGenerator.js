function extractNumber(label) {
  const match = label.match(/x(\d+)/i);
  return match ? parseInt(match[1], 10) : NaN;
}

export function generateMermaidCode(nodes, edges) {
  if (!nodes.length) return '';
  let code = 'graph LR\n';
  nodes.forEach(node => {
    const id = node.data.label;
    code += `    ${id}((${id}))\n`;
  });
  edges.forEach(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    if (sourceNode && targetNode) {
      const sourceLabel = sourceNode.data.label;
      const targetLabel = targetNode.data.label;
      const sourceNum = extractNumber(sourceLabel);
      const targetNum = extractNumber(targetLabel);
      const edgeLabel = edge.data?.label || '';
      let arrow;
      if (!isNaN(sourceNum) && !isNaN(targetNum)) {
        arrow = sourceNum < targetNum ? '-->' : '<--';
      } else {
        arrow = '-->';
      }
      if (edgeLabel) {
        code += `    ${sourceLabel} ${arrow}|${edgeLabel}| ${targetLabel}\n`;
      } else {
        code += `    ${sourceLabel} ${arrow} ${targetLabel}\n`;
      }
    }
  });
  return code;
}