
import { IProfile } from "../../user/interfaces/user";
import { PaymentMethod, PaymentPurpose, PaymentStatus } from "../enums/payment.enum";

export interface IPaymentTransaction {
    id: string;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    paymentPurpose: PaymentPurpose;
    createdAt?: string;
    profile?: IProfile;
}