import { Browser } from "@capacitor/browser";
import { APIBaseURL, postData } from "../../shared/api/base";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { IApiResponse } from "../../shared/interfaces/api-response";
import { PaymentDTO } from "../dtos/payment.dto";
import { PaystackInitiatePaymentResponseDto } from "../dtos/paystack.dto";
import { DonorStatus, IDonateDTO } from "../Components/DonateButton";
import { useLocalStorage } from "../../utils";
import { IAuthUserProfile } from "../../user/interfaces/user";
import { LocalStorageEnum } from "../../shared/enums";

export interface IUsePaymentMembers {
  makePayment: (dto: PaymentDTO) => void;
  makeDonation: (dto: IDonateDTO & PaymentDTO) => void;
}

export const usePayment = (): IUsePaymentMembers => {
  const { setLoading, handleAsyncError } = useAsyncHelpersContext();
  const {setItem} = useLocalStorage();

  const makePayment = async (dto: PaymentDTO) => {
    try {
      setLoading({ isLoading: true, loadingMessage: "initiating paymnet" });

      const res = await postData<
        IApiResponse<PaystackInitiatePaymentResponseDto>
      >(`${APIBaseURL}/transaction/pay`, {
        method: "post",
        ...dto,
      });
      Browser.open({ url: res.data?.authorization_url as string });
    } catch (error) {
      handleAsyncError(error, "Error generating payment link");
    }
  };

   const makeDonation = async (dto: PaymentDTO & IDonateDTO) => {
    try {
      setLoading({ isLoading: true, loadingMessage: "initiating paymnet" });

      const res = await postData<
       {profile: IAuthUserProfile} & IApiResponse<PaystackInitiatePaymentResponseDto>
      >(`${APIBaseURL}/transaction/donate`, {
        method: "post",
        ...dto,
      });
      if(dto.donorStatus !== DonorStatus.ANONYMOUS) setItem<IAuthUserProfile>(LocalStorageEnum.USER, res.profile);
      
      Browser.open({ url: res.data?.authorization_url as string });
    } catch (error) {
      handleAsyncError(error, "Error generating donation payment link");
    }
  };
 
  return { makePayment, makeDonation };
};
