export const liveReloadCode = `
(() => {
  const wsUrl = \`ws://127.0.0.1:PORT_NUMBER/_reload\`;
  const ws = new WebSocket(wsUrl);
  ws.addEventListener('message', () => location.reload());
})();
`;
