export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function openUrl(url: string): void {
  if (!url) {
    return;
  }
  window.open(url, '_blank').focus();
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
