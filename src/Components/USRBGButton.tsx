import {
  fluxDispatcher as FluxDispatcher,
  toast as Toasts,
  guilds as UltimateGuildStore,
} from "replugged/common";
import { USBBG_SERVER_ID, USBBG_SERVER_INVITE_CODE } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default () => (
  <Modules.HeaderButton
    icon={() => (
      <svg
        viewBox="0 0 24 24"
        style={{
          width: "16px",
          height: "16px",
        }}>
        <path
          fill="currentColor"
          d="M10.8979 7.51472C11.304 7.59598 11.5674 7.99112 11.4861 8.39728L11.2655 9.5H13.7358L14.0153 8.10301C14.0966 7.69684 14.4917 7.43346 14.8979 7.51472C15.304 7.59598 15.5674 7.99112 15.4861 8.39728L15.2655 9.5H16.25C16.6642 9.5 17 9.83579 17 10.25C17 10.6642 16.6642 11 16.25 11H14.9654L14.5653 13H15.75C16.1642 13 16.5 13.3358 16.5 13.75C16.5 14.1642 16.1642 14.5 15.75 14.5H14.2652L13.9856 15.8975C13.9043 16.3037 13.5092 16.567 13.103 16.4858C12.6968 16.4045 12.4335 16.0094 12.5147 15.6032L12.7354 14.5H10.2652L9.98557 15.8975C9.90431 16.3037 9.50917 16.567 9.10301 16.4858C8.69684 16.4045 8.43346 16.0094 8.51472 15.6032L8.73544 14.5H7.75C7.33579 14.5 7 14.1642 7 13.75C7 13.3358 7.33579 13 7.75 13H9.03555L9.43569 11H8.25C7.83579 11 7.5 10.6642 7.5 10.25C7.5 9.83579 7.83579 9.5 8.25 9.5H9.73579L10.0153 8.10301C10.0966 7.69684 10.4917 7.43346 10.8979 7.51472ZM10.5653 13H13.0355L13.4357 11H10.9654L10.5653 13ZM3 6.25C3 4.45507 4.45507 3 6.25 3H17.75C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25ZM6.25 4.5C5.2835 4.5 4.5 5.2835 4.5 6.25V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H17.75C18.7165 19.5 19.5 18.7165 19.5 17.75V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5H6.25Z"
        />
      </svg>
    )}
    text="USRBG Banner"
    onClick={async (): Promise<void> => {
      if (UltimateGuildStore.getGuild(USBBG_SERVER_ID)) {
        FluxDispatcher.dispatch({ type: "LAYER_POP_ALL" });
        Modules.RoutingUtils?.transitionTo(`/channels/449175561529589761/886287835018178560`);
        return;
      }
      const inviteInfo = await Modules.InviteActions?.resolveInvite(USBBG_SERVER_INVITE_CODE);
      if (inviteInfo.invite == null) {
        Toasts.toast("Error Resolving Invite, Try Different Invite.", Toasts.Kind.FAILURE);
        return;
      }
      FluxDispatcher.dispatch({ type: "LAYER_POP_ALL" });
      FluxDispatcher.dispatch({
        type: "INVITE_MODAL_OPEN",
        ...inviteInfo,
      });
    }}
    variant="banner"
  />
);
