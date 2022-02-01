

export type AlertData = IAlertData | undefined;

interface IAlertData {
  type: 'success' | 'warning' | 'error' | 'info',
  message: string
}