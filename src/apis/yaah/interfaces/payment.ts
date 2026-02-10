import { BaseRecord } from '@/apis/base';

export interface IYaahApiPaymentProvider {
  id: string;
  name: string;
}

export interface IYaahApiPaymentMethod extends BaseRecord {
  label: string;
  icon: string;
  description: string;
  default_provider: IYaahApiPaymentProvider;
  supported_currencies: string[];
}

export interface IYaahApiPayment extends BaseRecord {
  orderId: string;
  paymentLink: string;
  paymentTransaction: IYaahApiPaymentTransaction;
}

export interface IYaahApiPaymentTransaction extends BaseRecord {
  tenant: string;
  reservation: string;
  type: 'full_payment' | string;
  amount: string;
  metadata: Record<string, any>;
  status: 'pending' | 'success' | 'failed' | 'completed';
  order_id: string;
  gateway_metadata: IYaahApiGatewayMetadata;
  refund_amount: string;
  refund_reason: string | null;
  refunded_at: string | null;
  notes: string | null;
  payment_link: string;
  gateway_method_metadata: IYaahApiGatewayMethodMetadata;
}

export interface IYaahApiGatewayMetadata {
  id: string;
  orderId: string;
  amount: number;
  message: string;
  provider: string;
  status: string;
  method: string;
  currency: string;
  is_cancellable: boolean;
  details: any | null;
  buyer_email: string;
  created_at: number;
  mode: 'sandbox' | 'production' | string;
  metadata: IYaahApiGatewayExtraMetadata;
  qr_code: string;
  _link: IYaahApiGatewayLinks;
  tran: string;
}

export interface IYaahApiGatewayExtraMetadata {
  app: {
    app_id: string;
    name: string;
    status: string;
  };
  bank_account: {
    account_name: string;
    account_number: string;
    bank_code: string;
    bank_name: string;
    bank_branch: string;
  };
  isBase64: boolean;
}

export interface IYaahApiGatewayLinks {
  payment_link: {
    href: string;
    type: string;
  };
  self: {
    href: string;
  };
}

export interface IYaahApiGatewayMethodMetadata {
  id: string;
  label: string;
  icon: string;
  description: string;
  default_provider: {
    id: string;
    name: string;
  };
  supported_currencies: string[];
}
