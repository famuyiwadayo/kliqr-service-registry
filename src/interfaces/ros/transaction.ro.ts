export interface TransactionRo {
  id: string | number;
  user_id: string | number;
  amount: number;
  type: string;
  category: string;
  icon_url: string;
  date_time: Date | number | string;
}
