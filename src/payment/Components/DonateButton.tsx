import { useState } from "react";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { LocalStorageEnum } from "../../shared/enums";
import { IAuthUserProfile } from "../../user/interfaces/user";
import { formatCurrency, useLocalStorage } from "../../utils";
import { usePayment } from "../hooks/payment";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
} from "@ionic/react";
import { checkboxOutline, checkboxSharp, closeCircle } from "ionicons/icons";
import { formatCamelCaseToSentence } from "../../shared/helpers";
import { APIBaseURL, postData } from "../../shared/api/base";
import { PaymentMethod, PaymentPurpose } from "../enums/payment.enum";

export enum DonorStatus {
  ANONYMOUS = "Anonymous",
  LOGGED_USER = "Logged User",
  NEW_IDENTITY = "New Identity",
}

export interface IDonateDTO {
  email: string;
  fullName: string;
  amount: number;
  donorStatus: DonorStatus;
}

export const DonateButton = () => {
  const { makeDonation } = usePayment();
  const { setLoading, handleAsyncError } = useAsyncHelpersContext();
  const { getItem } = useLocalStorage();
  const authUser = getItem<IAuthUserProfile>(LocalStorageEnum.USER);

  const initDonateDto: IDonateDTO = {
    email: authUser?.email || "",
    fullName: authUser
      ? `${authUser.firstName} ${authUser.lastName || ""}`
      : "",
    amount: 0,
    donorStatus: authUser ? DonorStatus.LOGGED_USER : DonorStatus.NEW_IDENTITY,
  };

  const [openDonateOverlay, setOpenDonateOverlay] = useState(false);
  const [donateDto, setDonateDto] = useState(initDonateDto);

  const donate = async () => {
    try {
      setLoading({ isLoading: true, loadingMessage: "processing" });
      await makeDonation({
        paymentPurpose: PaymentPurpose.FUND_DEPOSIT,
        paymentMethod: PaymentMethod.PAYSTACK,
        ...donateDto,
      });
      setLoading({ isLoading: false, loadingMessage: "" });
    } catch (error) {
      handleAsyncError(error, "Error donating fund");
    }
  };
  return (
    <div>
      <IonButton
        aria-haspopup={true}
        aria-expanded={openDonateOverlay}
        onClick={() => setOpenDonateOverlay(!openDonateOverlay)}
      >
        Donate
      </IonButton>
      <IonModal
        isOpen={openDonateOverlay}
        onDidDismiss={() => setOpenDonateOverlay(false)}
      >
        <IonContent>
          <IonItem>
            <IonIcon
              role="button"
              aria-label="close"
              onClick={() => setOpenDonateOverlay(false)}
              icon={closeCircle}
              slot="end"
            />
          </IonItem>
          <h2>Donate</h2>
          <div className="ion-margin">
            {Object.values(DonorStatus).map((donorStatus) => (
              <span
                key={donorStatus}
                className="ion-margin"
                role="button"
                aria-label={donorStatus}
                onClick={() => setDonateDto({ ...donateDto, donorStatus })}
              >
                <IonIcon
                  icon={
                    donateDto.donorStatus === donorStatus
                      ? checkboxSharp
                      : checkboxOutline
                  }
                />
                <IonLabel className="ion-margin-horizontal">
                  {donorStatus}
                </IonLabel>
              </span>
            ))}
          </div>
          <IonList>
            <IonItem>
              <IonInput
                type="number"
                label="Amount (NGN)"
                labelPlacement="stacked"
                placeholder={`${donateDto.amount}`}
                value={donateDto.amount}
                onIonInput={(evt) =>
                  setDonateDto({
                    ...donateDto,
                    amount: evt.detail.value,
                  } as unknown as IDonateDTO)
                }
              />
            </IonItem>

            {(donateDto.donorStatus === DonorStatus.NEW_IDENTITY ||
              !authUser) &&
              Object.keys(initDonateDto).map((item, index) => (
                <IonItem key={index}>
                  {!["donorStatus", "amount"].includes(item) ? (
                    <>
                      <IonInput
                        type={/amount/i.test(item) ? "number" : "email"}
                        label={formatCamelCaseToSentence(item)}
                        labelPlacement="stacked"
                        placeholder={formatCamelCaseToSentence(item)}
                        required={/email/i.test(item)}
                        value={(donateDto as any)[item]}
                        onIonInput={(evt) => {
                          const name = evt.target.name;
                          const value = evt.detail.value;
                          setDonateDto({
                            ...donateDto,
                            [name]: value,
                          } as IDonateDTO);
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </IonItem>
              ))}
            <IonButton expand="full" onClick={donate}>
              Donate {formatCurrency(donateDto.amount, "NGN")}
            </IonButton>
          </IonList>
        </IonContent>
      </IonModal>
    </div>
  );
};
