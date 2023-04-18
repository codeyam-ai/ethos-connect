// src/index.ts
import { TransactionBlock as TransactionBlock2, verifyMessage, IntentScope } from "@mysten/sui.js";

// src/components/styled/SignInModal.tsx
import { useCallback as useCallback3, useEffect as useEffect3, useMemo as useMemo2, useState as useState3 } from "react";

// src/components/svg/Loader.tsx
var Loader = ({ width = 100, color = "#333" }) => <svg
  version="1.1"
  id="L4"
  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  viewBox="0 0 54 20"
  width={width}
  height={width * (20 / 54)}
  enableBackground="new 0 0 0 0"
>
  <circle fill={color} stroke="none" cx="6" cy="10" r="6"><animate
    attributeName="opacity"
    dur="1.5s"
    values="0;1;0"
    repeatCount="indefinite"
    begin="0.1"
  /></circle>
  <circle fill={color} stroke="none" cx="26" cy="10" r="6"><animate
    attributeName="opacity"
    dur="1.5s"
    values="0;1;0"
    repeatCount="indefinite"
    begin="0.5"
  /></circle>
  <circle fill={color} stroke="none" cx="46" cy="10" r="6"><animate
    attributeName="opacity"
    dur="1.5s"
    values="0;1;0"
    repeatCount="indefinite"
    begin="1.0"
  /></circle>
</svg>;
var Loader_default = Loader;

// src/components/svg/WalletsIcon.tsx
var WalletsIcon = ({ width = 32 }) => <img src={dataUri} width={width} height={width} />;
var WalletsIcon_default = WalletsIcon;
var dataUri = `data:image/png;base64,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`;

// src/components/styled/signInModalStyles.ts
var COLOR_LIGHT_TEXT_MEDIUM = "#74777C";
var ethosWalletTitleText = () => ({
  fontSize: "18px",
  lineHeight: "24px",
  fontWeight: "600",
  marginLeft: "10px"
});
var secondaryText = () => ({
  color: "#6B7280",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
});
var dialog = (isOpen) => ({
  visibility: isOpen ? "" : "hidden",
  position: "relative",
  zIndex: "100"
});
var backdrop = (isOpen) => (
  // fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity
  {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    backgroundColor: "rgb(107 114 128)",
    opacity: isOpen ? ".75" : "0",
    transition: "all 300ms ease-in-out"
  }
);
var highlighted = () => ({
  color: "#6D28D9"
});
var modalOuterWrapper = (isOpen) => (
  // fixed z-10 inset-0 overflow-y-auto
  {
    position: "fixed",
    zIndex: "99",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    overflowY: "auto",
    opacity: isOpen ? "1" : "0",
    scale: isOpen ? "1" : ".95",
    transition: "all 300ms ease-in-out"
  }
);
var modalInnerWrapper = (width) => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
    padding: "1rem",
    textAlign: "center"
  };
  const sm = {
    padding: "0",
    alignItems: "center"
  };
  return width < 640 /* sm */ ? styles : { ...styles, ...sm };
};
var dialogPanel = (width) => {
  const styles = {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#ffffff",
    transitionProperty: "all",
    borderRadius: "0.5rem",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  };
  const sm = {
    width: "360px"
  };
  return width < 640 /* sm */ ? styles : { ...styles, ...sm };
};
var topPanelStyle = () => ({
  padding: "24px 24px 0px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
});
var closeStyle = () => ({
  width: "24px",
  height: "24px",
  color: "#A0AEBA",
  cursor: "pointer"
});
var backStyle = () => ({
  color: COLOR_LIGHT_TEXT_MEDIUM,
  cursor: "pointer",
  display: "flex",
  gap: "6px",
  alignItems: "center"
});
var backStyleText = () => ({
  fontSize: "16px",
  lineHeight: "24px"
});
var headerStyle = (withIcon = false) => ({
  padding: withIcon ? "24px 24px 32px" : "0 24px 32px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "12px"
});
var headerLogosStyle = () => ({
  display: "flex",
  justifyContent: "center",
  gap: "-6px"
});
var titleStyle = () => ({
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "32px",
  margin: "0"
});
var subTitleStyle = () => ({
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "24px",
  margin: "0",
  color: COLOR_LIGHT_TEXT_MEDIUM
});
var strikeThroughOrContainer = () => ({
  padding: "0px 24px 24px",
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  justifyContent: "space-between",
  alignItems: "center",
  color: COLOR_LIGHT_TEXT_MEDIUM
});
var line = () => ({
  height: "1px",
  width: "100%",
  background: "rgba(0, 0, 0, 0.12)",
  borderRadius: "16px"
});
var emailInput = () => ({
  boxSizing: "border-box",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  borderRadius: "16px",
  background: "#F2F2F2",
  padding: "20px",
  width: "100%"
});
var walletOptionContainer = (width) => {
  const styles = {
    padding: "0px 24px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px"
  };
  const sm = {};
  return width < 640 /* sm */ ? styles : { ...styles, ...sm };
};
var iconButton = (width, disabled = false, primary2 = false, noIcon = false) => {
  const styles = {
    textDecoration: "none",
    fontWeight: primary2 ? "500" : "400",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    gap: "12px",
    justifyContent: noIcon ? "center" : "space-between",
    alignItems: "center",
    padding: primary2 ? "20px 20px" : "16px 16px 16px 20px",
    width: "100%",
    background: primary2 ? "#6D28D9" : "#F2F2F2",
    color: primary2 ? "white" : "black",
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: "16px",
    flex: "none",
    order: "0",
    flexGrow: "0",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    border: "none",
    fontSize: "inherit"
  };
  const sm = {};
  return width < 640 /* sm */ ? styles : { ...styles, ...sm };
};
var submitButtonContainer = () => ({
  padding: "0px 24px 24px"
});
var loaderStyle = () => ({
  display: "flex",
  justifyContent: "center",
  padding: "45px 0"
});
var walletExplanation = () => ({
  padding: "6px 0",
  color: "#666",
  width: "100%",
  fontSize: "smaller",
  marginBottom: "12px"
});

// src/lib/useHandleElementWithIdClicked.ts
import { useEffect } from "react";
function useHandleElementWithIdClicked(clickId, onClickOutside) {
  useEffect(() => {
    function handleClickOutside(event2) {
      if (event2.target.id === clickId) {
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}

// src/components/svg/EthosEnclosed.tsx
var EthosEnclosed = ({ width = 24, color = "#6D28D9" }) => <svg width={width} height={width} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="56" height="56" rx="16" fill={color} />
  <path opacity="0.8" d="M17.9631 13H36.9268C37.7997 13 38.5073 13.7076 38.5073 14.5805V35.9802C38.5073 36.8531 37.7997 37.5607 36.9268 37.5607H17.9631C17.0902 37.5607 16.3826 36.8531 16.3826 35.9802V14.5805C16.3826 13.7076 17.0902 13 17.9631 13Z" stroke="url(#paint0_linear_514_2169)" strokeOpacity="0.9" strokeWidth="0.790251" />
  <path d="M17.2471 14.0457L30.1651 20.0566C30.7225 20.316 31.0789 20.8749 31.0789 21.4896V42.6676C31.0789 43.8113 29.9018 44.5763 28.8566 44.112L15.9386 38.3725C15.3677 38.1189 14.9998 37.5528 14.9998 36.9281V15.4787C14.9998 14.3231 16.1994 13.5582 17.2471 14.0457Z" fill="white" fillOpacity="0.9" />
  <path d="M42.9117 27.9093C43.0029 27.4813 43.219 27.0901 43.5329 26.7851C43.8467 26.4801 44.2441 26.2753 44.6746 26.1965L45.8205 25.9872L44.6745 25.7779H44.6746C44.2441 25.6991 43.8467 25.4943 43.5329 25.1893C43.219 24.8843 43.0029 24.4931 42.9117 24.0651L42.6596 22.8774L42.4074 24.0651C42.3162 24.4931 42.1001 24.8843 41.7862 25.1893C41.4724 25.4943 41.075 25.6992 40.6445 25.7779L39.4985 25.9872L40.6446 26.1965H40.6445C41.075 26.2753 41.4724 26.4801 41.7861 26.7851C42.1 27.0901 42.3162 27.4813 42.4073 27.9093L42.6595 29.097L42.9117 27.9093Z" fill="white" fillOpacity="0.9" />
  <defs><linearGradient id="paint0_linear_514_2169" x1="38.5073" y1="19.5371" x2="27.4445" y2="25.0685" gradientUnits="userSpaceOnUse">
    <stop stopColor="white" />
    <stop offset="1" stopColor="white" stopOpacity="0" />
  </linearGradient></defs>
</svg>;
var EthosEnclosed_default = EthosEnclosed;

// src/components/svg/Ethos.tsx
var Ethos = ({ width = 24, color = "#1e293b" }) => <svg
  width={width}
  height={width * 65 / 47}
  viewBox="0 0 47 65"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6.00471 1H40.0029C42.7644 1 45.0029 3.23858 45.0029 6V44.8425C45.0029 47.604 42.7643 49.8425 40.0029 49.8425H6.0047C3.24328 49.8425 1.0047 47.604 1.0047 44.8425V6C1.0047 3.23858 3.24329 1 6.00471 1Z"
    stroke={color}
    strokeWidth="2"
  />
  <path
    d="M6.68764 3.64648L30.6631 14.8026C32.0736 15.4589 32.9756 16.8735 32.9756 18.4292V58.6799C32.9756 61.5743 29.9966 63.5105 27.3515 62.3353L3.37601 51.683C1.93126 51.0411 1.00013 49.6085 1.00013 48.0276V7.27309C1.00013 4.34854 4.03609 2.41268 6.68764 3.64648Z"
    fill={color}
  />
</svg>;
var Ethos_default = Ethos;

// src/components/styled/Header.tsx
var Header = ({ title, subTitle, dappIcon, showEthos = false, children }) => {
  return <div>
    <div style={headerStyle(!!dappIcon)}>
      <div style={headerLogosStyle()}>
        {dappIcon && (typeof dappIcon === "string" ? <img src={dappIcon} /> : dappIcon)}
        {showEthos && <Ethos_default />}
      </div>
      {title && <div style={titleStyle()}>{title}</div>}
      {subTitle && <div style={subTitleStyle()}>{subTitle}</div>}
    </div>
    {children}
  </div>;
};
var Header_default = Header;

// src/components/styled/EmailSent.tsx
var EmailSent = () => {
  return <Header_default
    title="Ethos sent you an email"
    dappIcon={<EthosEnclosed_default width={60} />}
  ><div style={secondaryText()}>
    <p>An email has been sent to you with a link to login.</p>
    <p>If you don't receive it, please check your spam folder or contact us at:</p>
    <p>support@ethoswallet.xyz</p>
  </div></Header_default>;
};
var EmailSent_default = EmailSent;

// src/components/styled/Wallets.tsx
import { useCallback } from "react";

// src/components/styled/IconButton.tsx
var IconButton = (props) => {
  const { text, icon, width, disabled, primary: primary2, type, ...reactProps } = props;
  return <button
    style={iconButton(width, disabled, primary2, !icon)}
    {...reactProps}
    type={type}
  >
    <div>{text}</div>
    {icon}
  </button>;
};
var IconButton_default = IconButton;

// src/components/styled/Wallets.tsx
var Wallets = ({ wallets, selectWallet, width }) => {
  const _connectExtension = useCallback((e) => {
    if (!selectWallet)
      return;
    let element = e.target;
    let name;
    while (!name && element.parentNode) {
      name = element.dataset.name;
      element = element.parentNode;
    }
    selectWallet(name);
  }, []);
  const icon = useCallback((wallet) => {
    const src = wallet.name === "Sui Wallet" ? "https://sui.io/favicon.png" : wallet.icon;
    return <img src={src} height={32} width={32} />;
  }, []);
  return <div role="wallet-sign-in"><div style={walletOptionContainer(width)}>{wallets?.map(
    (wallet, index) => <IconButton_default
      key={`select-wallet-${index}`}
      icon={icon(wallet)}
      data-name={wallet.name}
      text={wallet.name}
      onClick={_connectExtension}
      width={width}
    />
  )}</div></div>;
};
var Wallets_default = Wallets;

// src/components/styled/Email.tsx
import { useCallback as useCallback2, useMemo, useState } from "react";

// src/lib/getConfiguration.ts
import store from "store2";
var getConfiguration = () => {
  const ethosStore = store.namespace("ethos");
  const configuration = ethosStore("configuration");
  return configuration || {};
};
var getConfiguration_default = getConfiguration;

// src/lib/postIFrameMessage.ts
import store4 from "store2";

// src/lib/getIframe.ts
import store3 from "store2";

// src/lib/log.ts
import store2 from "store2";
var allowLog = (label) => {
  const logStore = store2.namespace("log");
  const allowed = logStore("allowed") || [];
  if (allowed.includes(label))
    return;
  logStore("allowed", [...allowed, label]);
  return `Logging enabled for ${label}. Call ethos.clearAllowLog() to turn off this logging.`;
};
var clearAllowLog = () => {
  const logStore = store2.namespace("log");
  logStore("allowed", []);
};
var log = (label, ...message) => {
  const logStore = store2.namespace("log");
  const allowed = logStore("allowed");
  if (!allowed || !(allowed.includes(label) || allowed.includes("all"))) {
    return;
  }
  console.log(label, ...message);
};
if (typeof window !== "undefined") {
  ;
  window.ethos = {
    allowLog,
    clearAllowLog
  };
}
var log_default = log;

// src/lib/getIframe.ts
var getIframe = (show) => {
  const { apiKey, walletAppUrl } = getConfiguration_default();
  log_default("getIframe", "getIframe", apiKey, walletAppUrl);
  if (!apiKey || !walletAppUrl)
    return;
  const iframeId = "ethos-wallet-iframe";
  let scrollY = 0;
  let iframe = document.getElementById(iframeId);
  const close = () => {
    if (!iframe)
      return;
    iframe.style.width = "1px";
    iframe.style.height = "1px";
  };
  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get("access_token");
  const refreshToken = queryParams.get("refresh_token");
  let fullWalletAppUrl = walletAppUrl + `/wallet?apiKey=${apiKey}`;
  if (accessToken && refreshToken) {
    fullWalletAppUrl += `&access_token=${accessToken}&refresh_token=${refreshToken}`;
    queryParams.delete("access_token");
    queryParams.delete("refresh_token");
    let fullPath = location.protocol + "//" + location.host + location.pathname;
    if (queryParams.toString().length > 0) {
      fullPath += "?" + queryParams.toString();
    }
    store3.namespace("auth")("access_token", accessToken);
    store3.namespace("auth")("refresh_token", refreshToken);
    window.history.pushState({}, "", fullPath);
  } else {
    const accessToken2 = store3.namespace("auth")("access_token");
    const refreshToken2 = store3.namespace("auth")("refresh_token");
    if (accessToken2 && refreshToken2) {
      fullWalletAppUrl += `&access_token=${accessToken2}&refresh_token=${refreshToken2}`;
    }
  }
  if (!iframe) {
    log_default("getIframe", "Load Iframe", fullWalletAppUrl);
    iframe = document.createElement("IFRAME");
    iframe.src = fullWalletAppUrl;
    iframe.id = iframeId;
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    iframe.style.top = scrollY - 1 + "px";
    iframe.style.right = "60px";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.zIndex = "99";
    iframe.style.backgroundColor = "transparent";
    iframe.setAttribute("allow", "payment; clipboard-read; clipboard-write");
    document.body.appendChild(iframe);
    window.addEventListener("message", (message) => {
      if (message.origin === walletAppUrl) {
        const { action } = message.data;
        switch (action) {
          case "close":
            close();
            break;
          case "ready":
            iframe.setAttribute("readyToReceiveMessages", "true");
            const messageStore = store3.namespace("iframeMessages");
            const messages = messageStore("messages") || [];
            for (const message2 of messages) {
              postIFrameMessage_default(message2);
            }
            messageStore("messages", null);
            break;
        }
      }
    });
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
      iframe.style.top = scrollY + "px";
    });
  }
  if (show) {
    iframe.style.width = "360px";
    iframe.style.height = "600px";
  } else if (show !== void 0) {
    close();
  }
  return iframe;
};
var getIframe_default = getIframe;

// src/lib/postIFrameMessage.ts
var postIFrameMessage = (message) => {
  const iframe = getIframe_default();
  if (!iframe?.getAttribute("readyToReceiveMessages")) {
    const messageStore = store4.namespace("iframeMessages");
    const existingMessages = messageStore("messages") || [];
    const result = messageStore("messages", [...existingMessages, message]);
    log_default("iframe", "Storing iframe message", result);
    return;
  }
  iframe?.contentWindow?.postMessage(message, "*");
};
var postIFrameMessage_default = postIFrameMessage;

// src/lib/event.ts
var event = async (eventProps) => {
  postIFrameMessage_default({
    action: "event",
    data: eventProps
  });
};
var event_default = event;

// src/lib/login.ts
import store8 from "store2";

// src/lib/getWalletContents.ts
import { Connection, JsonRpcProvider } from "@mysten/sui.js";

// src/lib/bigNumber.ts
import BigNumber from "bignumber.js";
var newBN = (value) => new BigNumber(value);
var sumBN = (balance, addition) => {
  let bn = new BigNumber(balance.toString());
  let bnAddition = new BigNumber(addition.toString());
  return bn.plus(bnAddition);
};
var formatBalance = (balance, decimals = 9) => {
  if (balance === void 0)
    return "---";
  let postfix = "";
  let bn = new BigNumber(balance.toString()).shiftedBy(-1 * decimals);
  if (bn.gte(1e9)) {
    bn = bn.shiftedBy(-9);
    postfix = " B";
  } else if (bn.gte(1e6)) {
    bn = bn.shiftedBy(-6);
    postfix = " M";
  } else if (bn.gte(1e4)) {
    bn = bn.shiftedBy(-3);
    postfix = " K";
  }
  if (bn.gte(1)) {
    bn = bn.decimalPlaces(3, BigNumber.ROUND_DOWN);
  } else {
    bn = bn.decimalPlaces(6, BigNumber.ROUND_DOWN);
  }
  return bn.toFormat() + postfix;
};

// src/lib/getBagNFT.ts
import { getObjectFields, is, SuiObjectData } from "@mysten/sui.js";
import _ from "lodash";
var UrlDomainRegex = /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::UrlDomain>, (0x[a-f0-9]{39,40})::display::UrlDomain>/;
var DisplayDomainRegex = /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::DisplayDomain>, (0x[a-f0-9]{39,40})::display::DisplayDomain>/;
var ID_PATH = "reference.objectId";
var BAG_ID_PATH = "data.fields.bag.fields.id.id";
var LOGICAL_OWNER_PATH = "data.fields.logical_owner";
var isTypeMatchRegex = (d, regex) => {
  const { data } = d;
  if (is(data, SuiObjectData)) {
    const { content } = data;
    if (content && "type" in content) {
      return content.type.match(regex);
    }
  }
  return false;
};
var parseDomains = (domains) => {
  const response = {};
  const urlDomain = domains.find((d) => isTypeMatchRegex(d, UrlDomainRegex));
  const displayDomain = domains.find(
    (d) => isTypeMatchRegex(d, DisplayDomainRegex)
  );
  if (urlDomain && getObjectFields(urlDomain)) {
    const url = getObjectFields(urlDomain).value.fields.url;
    response.url = ipfsConversion(url);
  }
  if (displayDomain && getObjectFields(displayDomain)) {
    response.description = getObjectFields(displayDomain).value.fields.description;
    response.name = getObjectFields(displayDomain).value.fields.name;
  }
  return response;
};
var isBagNFT = (data) => {
  return !!data.content && "fields" in data.content && "logical_owner" in data.content.fields && "bag" in data.content.fields;
};
var getBagNFT = async (provider, data) => {
  if (!isBagNFT(data) || !_.has(data, ID_PATH) || !_.has(data, BAG_ID_PATH) || !_.has(data, LOGICAL_OWNER_PATH))
    return data;
  const id = _.get(data, ID_PATH);
  const bagId = _.get(data, BAG_ID_PATH);
  const owner = _.get(data, LOGICAL_OWNER_PATH);
  const bagObjects = await provider.getDynamicFields({ parentId: bagId || "" });
  const objectIds = bagObjects.data.map((bagObject) => bagObject.objectId);
  const objects = await provider.multiGetObjects({
    ids: objectIds,
    options: {
      showContent: true,
      showDisplay: true,
      showOwner: true,
      showType: true
    }
  });
  return {
    id,
    owner,
    ...parseDomains(objects)
  };
};
var getBagNFT_default = getBagNFT;

// src/enums/Chain.ts
var Chain = /* @__PURE__ */ ((Chain2) => {
  Chain2["SUI_DEVNET"] = "sui:devnet";
  Chain2["SUI_TESTNET"] = "sui:testnet";
  Chain2["SUI_CUSTOM"] = "sui:custom";
  return Chain2;
})(Chain || {});

// src/lib/constants.ts
var primaryColor = "#6f53e4";
var appBaseUrl = typeof window !== "undefined" && window.location.origin.indexOf("http://localhost") === 0 ? "http://localhost:3000" : "https://ethoswallet.onrender.com";
var DEFAULT_NETWORK = "https://fullnode.devnet.sui.io/";
var DEFAULT_FAUCET = "https://faucet.devnet.sui.io/";
var DEFAULT_CHAIN = "sui:devnet" /* SUI_DEVNET */;

// src/lib/getDisplay.ts
var getDisplay = (display) => {
  if (!display)
    return;
  if (display?.data && typeof display?.data === "object") {
    return display.data;
  }
  if (!("error" in display))
    return display;
  return;
};
var getDisplay_default = getDisplay;

// src/lib/getWalletContents.ts
var ipfsConversion = (src) => {
  if (!src)
    return "";
  if (src.indexOf("ipfs") === 0) {
    src = `https://ipfs.io/ipfs/${src.substring(5)}`;
  }
  return src;
};
var empty = {
  suiBalance: newBN(0),
  nfts: [],
  tokens: {},
  objects: []
};
var getWalletContents = async ({ address: address2, network, existingContents }) => {
  try {
    const connection = new Connection({ fullnode: network || DEFAULT_NETWORK });
    const provider = new JsonRpcProvider(connection);
    if (!address2) {
      return empty;
    }
    const objectInfos = await provider.getOwnedObjects({
      owner: address2,
      options: {
        showType: true,
        showOwner: true,
        showContent: true,
        showDisplay: true
      }
    });
    if (objectInfos.data.length === 0) {
      if (existingContents === empty) {
        return null;
      }
      return empty;
    }
    const currentObjects = [];
    let newObjectInfos = [];
    if (existingContents?.objects && existingContents.objects.length > 0) {
      for (const objectInfo of objectInfos.data) {
        if (!objectInfo.data || objectInfo.error)
          continue;
        const existingObject = existingContents?.objects.find(
          (existingObject2) => {
            if (typeof objectInfo.data === "object" && typeof existingObject2.data === "object") {
              return existingObject2.data.objectId === objectInfo.data.objectId && existingObject2.data.version === objectInfo.data.version;
            } else {
              return false;
            }
          }
        );
        if (existingObject) {
          currentObjects.push(existingObject);
        } else {
          newObjectInfos.push(objectInfo);
        }
      }
    } else {
      newObjectInfos = objectInfos.data;
    }
    if (newObjectInfos.length === 0)
      return null;
    const newObjects = newObjectInfos;
    const objects = currentObjects.concat(newObjects);
    let suiBalance = newBN(0);
    const nfts = [];
    const tokens = {};
    const convenenienceObjects = [];
    for (const object of objects) {
      const { data } = object;
      if (!data)
        continue;
      const { display, content: { fields } } = data;
      const safeDisplay = getDisplay_default(display);
      try {
        const typeStringComponents = (data.type || "").split("<");
        const subtype = (typeStringComponents[1] || "").replace(/>/, "");
        const typeComponents = typeStringComponents[0].split("::");
        const type = typeComponents[typeComponents.length - 1];
        const { name, description, ...extraFields } = fields ?? {};
        convenenienceObjects.push({
          ...object,
          type: data?.type,
          version: data?.version,
          objectId: data?.objectId,
          name,
          description,
          display: safeDisplay,
          extraFields
        });
        if (type === "Coin") {
          if (subtype === "0x2::sui::SUI") {
            suiBalance = sumBN(suiBalance, fields.balance);
          }
          tokens[subtype] ||= {
            balance: 0,
            coins: []
          };
          tokens[subtype].balance = sumBN(tokens[subtype].balance, fields.balance);
          tokens[subtype].coins.push({
            objectId: data?.objectId,
            type: data?.type,
            balance: newBN(fields.balance),
            digest: data?.digest,
            version: data?.version,
            display: safeDisplay
          });
        } else if (isBagNFT(object.data)) {
          const bagNFT = await getBagNFT_default(provider, object.data);
          if ("name" in bagNFT) {
            nfts.push({
              type: data?.type,
              package: typeComponents[0],
              chain: "Sui",
              address: data?.objectId,
              objectId: data?.objectId,
              name: safeDisplay?.name ?? bagNFT.name,
              description: safeDisplay?.name ?? bagNFT.description,
              imageUri: ipfsConversion(safeDisplay?.image_url ?? bagNFT.url),
              link: safeDisplay?.link,
              creator: safeDisplay?.creator,
              projectUrl: safeDisplay?.project_url,
              display: safeDisplay,
              module: typeComponents[1],
              links: {
                "Explorer": `https://explorer.sui.io/objects/${object?.objectId}`
              }
            });
          }
        } else {
          const { url, image_url, image, ...remaining } = extraFields || {};
          const safeUrl = ipfsConversion(safeDisplay?.image_url || url || image_url || image);
          if (safeUrl) {
            nfts.push({
              type: data?.type,
              package: typeComponents[0],
              chain: "Sui",
              address: data?.objectId,
              objectId: data?.objectId,
              name: safeDisplay?.name ?? name,
              description: safeDisplay?.description ?? description,
              imageUri: safeUrl,
              link: safeDisplay?.link,
              creator: safeDisplay?.creator,
              projectUrl: safeDisplay?.project_url,
              display: safeDisplay,
              extraFields: remaining,
              module: typeComponents[1],
              links: {
                "Explorer": `https://explorer.sui.io/objects/${object?.objectId}`
              }
            });
          }
        }
      } catch (error) {
        console.log("Error retrieving object", object, error);
      }
    }
    return { suiBalance, tokens, nfts, objects: convenenienceObjects };
  } catch (error) {
    console.log("Error retrieving wallet contents", error);
    return null;
  }
};
var getWalletContents_default = getWalletContents;

// src/lib/getEthosSigner.ts
import store6 from "store2";

// src/lib/activeUser.ts
var activeUser = () => {
  log_default("activeUser", "Calling Active User");
  const { walletAppUrl, apiKey } = getConfiguration_default();
  log_default("activeUser", "Configuration", walletAppUrl, apiKey);
  const resolver = (resolve) => {
    const listener = (message2) => {
      log_default("activeUser", "Message Origin: ", message2.origin, walletAppUrl, message2);
      if (message2.origin === walletAppUrl) {
        const { action, data } = message2.data;
        log_default("activeUser", "Message From Wallet", action, data);
        if (action === "user" && data.apiKey === apiKey) {
          window.removeEventListener("message", listener);
          resolve(data?.user);
        }
      }
    };
    window.addEventListener("message", listener);
    const message = { action: "activeUser" };
    log_default("activeUser", "getIframe");
    getIframe_default();
    log_default('activeUser", "Post message to the iframe', message);
    postIFrameMessage_default(message);
  };
  return new Promise(resolver);
};
var activeUser_default = activeUser;

// src/lib/hostedInteraction.ts
import store5 from "store2";
var hostedInteraction = ({ id, action, data, onResponse, showWallet: showWallet2 = false }) => {
  const { walletAppUrl } = getConfiguration_default();
  const iframeListener = (message) => {
    log_default("hostedInteraction", "response: ", message);
    if (message.origin === walletAppUrl) {
      const { approved, action: responseAction, data: responseData } = message.data;
      if (responseAction !== action)
        return;
      onResponse({ approved, data: responseData });
      window.removeEventListener("message", iframeListener);
      getIframe_default(false);
    }
  };
  window.addEventListener("message", iframeListener);
  const ethosStore = store5.namespace("ethos");
  const configuration = ethosStore("configuration");
  const { network } = configuration;
  log_default("hostedInteraction", "Posting interaction", id, action, data);
  postIFrameMessage_default({ id, network, action, data });
  getIframe_default(showWallet2);
};
var hostedInteraction_default = hostedInteraction;

// src/lib/getEthosSigner.ts
var getEthosSigner = async ({ defaultChain }) => {
  const user = await activeUser_default();
  const accounts = (user?.accounts || []).filter((account) => account.chain === "sui");
  const currentAccount = accounts[0];
  const signAndExecuteTransactionBlock = (input) => {
    return new Promise((resolve, reject) => {
      const transactionEventListener = ({ approved, data }) => {
        if (approved) {
          resolve(data.response);
        } else {
          reject({ error: data?.response?.error || "User rejected transaction." });
        }
      };
      const serializedTransaction = input.transactionBlock.serialize();
      const account = input.account ?? currentAccount.address;
      const chain = input.chain ?? defaultChain ?? DEFAULT_CHAIN;
      hostedInteraction_default({
        action: "transaction",
        data: {
          input,
          serializedTransaction,
          account,
          chain
        },
        onResponse: transactionEventListener,
        showWallet: true
      });
    });
  };
  const signTransactionBlock = (input) => {
    return new Promise((resolve, reject) => {
      const transactionEventListener = ({ approved, data }) => {
        if (approved) {
          resolve(data.response);
        } else {
          reject({ error: data?.response?.error || "User rejected transaction." });
        }
      };
      const serializedTransaction = input.transactionBlock.serialize();
      const account = input.account ?? currentAccount.address;
      const chain = input.chain ?? defaultChain ?? DEFAULT_CHAIN;
      hostedInteraction_default({
        action: "transaction",
        data: {
          input,
          serializedTransaction,
          account,
          chain
        },
        onResponse: transactionEventListener,
        showWallet: true
      });
    });
  };
  const requestPreapproval = () => {
    return Promise.resolve(true);
  };
  const signMessage = (input) => {
    return new Promise((resolve, reject) => {
      const transactionEventListener = ({ approved, data }) => {
        if (approved) {
          resolve(data.response);
        } else {
          reject({ error: data?.response?.error || "User rejected signing." });
        }
      };
      hostedInteraction_default({
        action: "sign",
        data: { ...input, signData: input.message },
        onResponse: transactionEventListener,
        showWallet: true
      });
    });
  };
  const disconnect = (fromWallet = false) => {
    return new Promise((resolve) => {
      const transactionEventListener = () => {
        resolve(true);
      };
      hostedInteraction_default({
        action: "logout",
        data: {
          fromWallet: typeof fromWallet === "boolean" ? fromWallet : false
        },
        onResponse: transactionEventListener
      });
      store6.namespace("auth")("access_token", null);
    });
  };
  const logout2 = () => {
    return disconnect(true);
  };
  return user ? {
    type: "hosted" /* Hosted */,
    name: "Ethos",
    icon: dataIcon,
    email: user.email,
    getAddress: async () => currentAccount?.address,
    accounts,
    currentAccount,
    signAndExecuteTransactionBlock,
    signTransactionBlock,
    requestPreapproval,
    signMessage,
    disconnect,
    logout: logout2
  } : null;
};
var getEthosSigner_default = getEthosSigner;
var dataIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzZEMjhEOSIvPgo8cGF0aCBvcGFjaXR5PSIwLjgiIGQ9Ik05LjEyMTg3IDYuODU3MDZIMTkuOTU4M0MyMC40NTcxIDYuODU3MDYgMjAuODYxNCA3LjI2MTQxIDIwLjg2MTQgNy43NjAyVjE5Ljk4ODZDMjAuODYxNCAyMC40ODc0IDIwLjQ1NzEgMjAuODkxOCAxOS45NTgzIDIwLjg5MThIOS4xMjE4N0M4LjYyMzA4IDIwLjg5MTggOC4yMTg3MiAyMC40ODc0IDguMjE4NzIgMTkuOTg4NlY3Ljc2MDJDOC4yMTg3MiA3LjI2MTQxIDguNjIzMDggNi44NTcwNiA5LjEyMTg3IDYuODU3MDZaIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl82OTlfMjY5OCkiIHN0cm9rZS13aWR0aD0iMC40NTE1NzIiLz4KPHBhdGggZD0iTTguNzEyNzQgNy40NTQ1OUwxNi4wOTQ1IDEwLjg4OTRDMTYuNDEyOSAxMS4wMzc2IDE2LjYxNjYgMTEuMzU3IDE2LjYxNjYgMTEuNzA4M1YyMy44MUMxNi42MTY2IDI0LjQ2MzUgMTUuOTQ0IDI0LjkwMDcgMTUuMzQ2OCAyNC42MzUzTDcuOTY1MDIgMjEuMzU1NkM3LjYzODgyIDIxLjIxMDcgNy40Mjg1OCAyMC44ODcyIDcuNDI4NTggMjAuNTMwM1Y4LjI3MzQzQzcuNDI4NTggNy42MTMxMSA4LjExNDA2IDcuMTc2MDIgOC43MTI3NCA3LjQ1NDU5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIzLjM3ODIgMTUuMzc2N0MyMy40MzAzIDE1LjEzMjEgMjMuNTUzOCAxNC45MDg2IDIzLjczMzIgMTQuNzM0M0MyMy45MTI1IDE0LjU2IDI0LjEzOTYgMTQuNDQzIDI0LjM4NTYgMTQuMzk3OUwyNS4wNDA0IDE0LjI3ODRMMjQuMzg1NSAxNC4xNTg4SDI0LjM4NTZDMjQuMTM5NiAxNC4xMTM3IDIzLjkxMjUgMTMuOTk2NyAyMy43MzMyIDEzLjgyMjRDMjMuNTUzOCAxMy42NDgxIDIzLjQzMDMgMTMuNDI0NiAyMy4zNzgyIDEzLjE4TDIzLjIzNDEgMTIuNTAxM0wyMy4wOSAxMy4xOEMyMy4wMzc5IDEzLjQyNDYgMjIuOTE0NCAxMy42NDgxIDIyLjczNTEgMTMuODIyNEMyMi41NTU4IDEzLjk5NjcgMjIuMzI4NyAxNC4xMTM4IDIyLjA4MjcgMTQuMTU4OEwyMS40Mjc4IDE0LjI3ODRMMjIuMDgyNyAxNC4zOTc5SDIyLjA4MjdDMjIuMzI4NyAxNC40NDMgMjIuNTU1NyAxNC41NiAyMi43MzUgMTQuNzM0M0MyMi45MTQ0IDE0LjkwODYgMjMuMDM3OSAxNS4xMzIxIDIzLjA5IDE1LjM3NjdMMjMuMjM0MSAxNi4wNTU0TDIzLjM3ODIgMTUuMzc2N1oiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNjk5XzI2OTgiIHgxPSIyMC44NjE0IiB5MT0iMTAuNTkyNiIgeDI9IjE0LjUzOTgiIHkyPSIxMy43NTM0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IndoaXRlIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=`;

// src/lib/initializeEthos.ts
import store7 from "store2";
var initializeEthos = (ethosConfiguration) => {
  const ethosStore = store7.namespace("ethos");
  log_default("initialize", "Ethos Configuration", ethosConfiguration);
  ethosStore("configuration", ethosConfiguration);
};
var initializeEthos_default = initializeEthos;

// src/lib/listenForMobileConnection.ts
var listenForMobileConnection = async () => {
  const { walletAppUrl } = getConfiguration_default();
  const connectionEventListener = (message) => {
    if (message.origin === walletAppUrl) {
      const { action, data } = message.data;
      if (action !== "connect")
        return;
      if (!data.address) {
        return;
      }
      ;
      window.removeEventListener("message", connectionEventListener);
      const signer = {
        currentAccount: { address: data.address }
      };
      const provider = {
        getSigner: signer
      };
      log_default("mobile", "Mobile connection established", provider, signer);
    }
  };
  window.removeEventListener("message", connectionEventListener);
  window.addEventListener("message", connectionEventListener);
};
var listenForMobileConnection_default = listenForMobileConnection;

// src/lib/lib.ts
var lib = {
  // showWallet,
  // hideWallet,
  // login,
  // logout,
  // transact,
  // preapprove,
  getWalletContents: getWalletContents_default,
  // dripSui,
  postIFrameMessage: postIFrameMessage_default,
  getEthosSigner: getEthosSigner_default,
  getConfiguration: getConfiguration_default,
  initializeEthos: initializeEthos_default,
  listenForMobileConnection: listenForMobileConnection_default
};
var lib_default = lib;

// src/lib/login.ts
var login = async ({ email, provider, apiKey }) => {
  const { walletAppUrl, redirectTo } = lib_default.getConfiguration();
  const userStore = store8.namespace("users");
  if (provider) {
    const returnTo = redirectTo ?? location.href;
    const fullUrl = `${walletAppUrl}/auth?apiKey=${apiKey}&returnTo=${encodeURIComponent(returnTo)}`;
    location.href = `${walletAppUrl}/socialauth?provider=${provider}&redirectTo=${encodeURIComponent(fullUrl)}`;
    return;
  }
  return new Promise((resolve, _reject) => {
    const loginEventListener = (message) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data;
        if (action !== "login")
          return;
        window.removeEventListener("message", loginEventListener);
        userStore("current", data);
        resolve(data);
      }
    };
    window.addEventListener("message", loginEventListener);
    lib_default.postIFrameMessage({
      action: "login",
      data: {
        email,
        provider,
        returnTo: redirectTo ?? window.location.href,
        apiKey
      }
    });
  });
};
var login_default = login;

// src/components/styled/Email.tsx
var Email = ({ setSigningIn, setEmailSent, width }) => {
  const { apiKey } = getConfiguration_default();
  const [email, setEmail] = useState("");
  const validEmail = useMemo(() => {
    if (!email)
      return false;
    if (email.length === 0)
      return false;
    return !!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
  }, [email]);
  const sendEmail = useCallback2(async () => {
    if (!validEmail)
      return;
    await login_default({ email, apiKey });
    setEmail("");
    setSigningIn(false);
    setEmailSent(true);
    event_default({ action: "send_email", category: "sign_in", label: email, value: 1 });
  }, [validEmail, login_default, email, apiKey]);
  const _handleChange = useCallback2((e) => {
    setEmail(e.target.value);
  }, []);
  const onSubmit = useCallback2(async (e) => {
    if (!validEmail) {
      e.preventDefault();
      return;
    }
    setSigningIn(true);
    sendEmail();
  }, [sendEmail]);
  return <div role="email-sign-in">
    <form onSubmit={onSubmit} style={walletOptionContainer(width)}>
      <input
        style={emailInput()}
        type="email"
        placeholder="Enter your email address..."
        value={email}
        onChange={_handleChange}
      />
      <IconButton_default
        text="Sign In With Email"
        type="submit"
        width={width}
        disabled={!validEmail}
        primary={true}
      />
    </form>
    {
      /* <div style={{ display: 'none', marginLeft: "-12px" }}>
          <ReCAPTCHA
              sitekey={captchaSiteKey}
              ref={captchaRef}
              size="invisible"
              onChange={sendEmail}
          />
      </div> */
    }
  </div>;
};
var Email_default = Email;

// src/components/styled/FontProvider.tsx
var FontProvider = ({ children }) => {
  const styles = () => ({
    fontFamily: "'Inter', sans-serif",
    color: "black",
    lineHeight: "1.5",
    fontSize: "16px"
  });
  return <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    <div style={styles()}>{children}</div>
  </>;
};
var FontProvider_default = FontProvider;

// src/components/styled/Dialog.tsx
var Dialog = ({ isOpenAll, children }) => {
  return <FontProvider_default><div style={dialog(isOpenAll)} role="dialog">
    <div style={backdrop(isOpenAll)} />
    {children}
  </div></FontProvider_default>;
};
var Dialog_default = Dialog;

// src/components/styled/ModalWrapper.tsx
var ModalWrapper = ({ closeOnClickId, onClose, isOpenAll, width, back, children }) => {
  return <div style={modalOuterWrapper(isOpenAll)}><div id={closeOnClickId} style={modalInnerWrapper(width)}><div style={dialogPanel(width)}>
    <div style={topPanelStyle()}>
      <span>{back && <span style={backStyle()} onClick={back}>
        {"\u2190"}
        <span style={backStyleText()}>Back</span>
      </span>}</span>
      <span style={closeStyle()} onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></span>
    </div>
    {children}
  </div></div></div>;
};
var ModalWrapper_default = ModalWrapper;

// src/components/svg/InstallWalletIcon.tsx
var InstallWalletIcon = ({ width = 60 }) => {
  return <svg width={width} height={width} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="58" height="58" rx="17" fill="#1A1C26" />
    <path d="M17.0307 21.5C18.1258 20.5314 19.538 19.9977 21 20H39C40.5213 20 41.9107 20.5667 42.9693 21.5C42.8475 20.5332 42.377 19.6442 41.6462 18.9998C40.9153 18.3553 39.9744 17.9998 39 18H21C20.0256 17.9998 19.0847 18.3553 18.3538 18.9998C17.623 19.6442 17.1525 20.5332 17.0307 21.5ZM17.0307 25.5C18.1258 24.5314 19.538 23.9977 21 24H39C40.5213 24 41.9107 24.5667 42.9693 25.5C42.8475 24.5332 42.377 23.6442 41.6462 22.9998C40.9153 22.3553 39.9744 21.9998 39 22H21C20.0256 21.9998 19.0847 22.3553 18.3538 22.9998C17.623 23.6442 17.1525 24.5332 17.0307 25.5ZM21 26C19.9391 26 18.9217 26.4214 18.1716 27.1716C17.4214 27.9217 17 28.9391 17 30V38C17 39.0609 17.4214 40.0783 18.1716 40.8284C18.9217 41.5786 19.9391 42 21 42H39C40.0609 42 41.0783 41.5786 41.8284 40.8284C42.5786 40.0783 43 39.0609 43 38V30C43 28.9391 42.5786 27.9217 41.8284 27.1716C41.0783 26.4214 40.0609 26 39 26H34C33.7348 26 33.4804 26.1054 33.2929 26.2929C33.1054 26.4804 33 26.7348 33 27C33 27.7956 32.6839 28.5587 32.1213 29.1213C31.5587 29.6839 30.7956 30 30 30C29.2044 30 28.4413 29.6839 27.8787 29.1213C27.3161 28.5587 27 27.7956 27 27C27 26.7348 26.8946 26.4804 26.7071 26.2929C26.5196 26.1054 26.2652 26 26 26H21Z" fill="white" />
    <rect x="1" y="1" width="58" height="58" rx="17" stroke="#060914" strokeWidth="2" />
  </svg>;
};
var InstallWalletIcon_default = InstallWalletIcon;

// src/components/svg/SuiEnclosed.tsx
var SuiEnclosed = ({ width = 32 }) => {
  return <svg width={width} height={width} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#81BAEB" />
    <g clipPath="url(#clip0_315_6756)"><path fillRule="evenodd" clipRule="evenodd" d="M10.4932 22.2659C11.0635 23.2776 11.8925 24.1195 12.8953 24.7053C13.898 25.2912 15.0385 25.5999 16.1999 25.5999C17.3613 25.5999 18.5017 25.2912 19.5045 24.7053C20.5073 24.1195 21.3363 23.2776 21.9066 22.2659C22.4918 21.2523 22.7999 20.1025 22.7999 18.932C22.7999 17.7616 22.4918 16.6118 21.9066 15.5982L16.8874 6.80155C16.8187 6.67967 16.7188 6.57825 16.598 6.50767C16.4772 6.4371 16.3398 6.3999 16.1999 6.3999C16.06 6.3999 15.9226 6.4371 15.8018 6.50767C15.6809 6.57825 15.5811 6.67967 15.5123 6.80155L10.4932 15.5982C9.90796 16.6118 9.59985 17.7616 9.59985 18.932C9.59985 20.1025 9.90796 21.2523 10.4932 22.2659ZM14.786 10.9865L15.8561 9.11092C15.8905 9.04998 15.9404 8.99927 16.0008 8.96399C16.0612 8.9287 16.1299 8.9101 16.1999 8.9101C16.2698 8.9101 16.3385 8.9287 16.399 8.96399C16.4594 8.99927 16.5093 9.04998 16.5437 9.11092L20.6605 16.3263C21.0301 16.966 21.2592 17.6771 21.3326 18.4123C21.4061 19.1475 21.3221 19.8898 21.0864 20.59C21.0352 20.3514 20.9648 20.1172 20.8758 19.8899C20.3072 18.4377 19.0214 17.3171 17.0534 16.559C15.7004 16.0397 14.8368 15.276 14.4859 14.2886C14.0339 13.0166 14.506 11.6291 14.786 10.9865ZM12.9612 14.1847L11.7392 16.3263C11.2817 17.1186 11.0409 18.0174 11.0409 18.9323C11.0409 19.8472 11.2817 20.7459 11.7392 21.5382C12.1091 22.1934 12.6186 22.7591 13.2316 23.1952C13.8447 23.6312 14.5462 23.927 15.2864 24.0615C16.0266 24.1959 16.7874 24.1658 17.5146 23.9732C18.2419 23.7806 18.9178 23.4302 19.4944 22.947C19.8131 22.1324 19.8244 21.2296 19.5264 20.4072C19.1088 19.358 18.1034 18.5204 16.5383 17.9172C14.7692 17.2381 13.6199 16.178 13.1228 14.7672C13.0558 14.5769 13.0019 14.3823 12.9612 14.1847Z" fill="white" /></g>
    <defs><clipPath id="clip0_315_6756"><rect width="19.2" height="19.2" fill="white" transform="translate(6.3999 6.3999)" /></clipPath></defs>
  </svg>;
};
var SuiEnclosed_default = SuiEnclosed;

// src/components/svg/EthosWalletIcon.tsx
var EthosWalletIcon = () => {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#6D28D9" />
    <path opacity="0.8" d="M9.12187 6.85706H19.9583C20.4571 6.85706 20.8614 7.26141 20.8614 7.7602V19.9886C20.8614 20.4874 20.4571 20.8918 19.9583 20.8918H9.12187C8.62308 20.8918 8.21872 20.4874 8.21872 19.9886V7.7602C8.21872 7.26141 8.62308 6.85706 9.12187 6.85706Z" stroke="url(#paint0_linear_699_2698)" strokeWidth="0.451572" />
    <path d="M8.71274 7.45459L16.0945 10.8894C16.4129 11.0376 16.6166 11.357 16.6166 11.7083V23.81C16.6166 24.4635 15.944 24.9007 15.3468 24.6353L7.96502 21.3556C7.63882 21.2107 7.42858 20.8872 7.42858 20.5303V8.27343C7.42858 7.61311 8.11406 7.17602 8.71274 7.45459Z" fill="white" />
    <path d="M23.3782 15.3767C23.4303 15.1321 23.5538 14.9086 23.7332 14.7343C23.9125 14.56 24.1396 14.443 24.3856 14.3979L25.0404 14.2784L24.3855 14.1588H24.3856C24.1396 14.1137 23.9125 13.9967 23.7332 13.8224C23.5538 13.6481 23.4303 13.4246 23.3782 13.18L23.2341 12.5013L23.09 13.18C23.0379 13.4246 22.9144 13.6481 22.7351 13.8224C22.5558 13.9967 22.3287 14.1138 22.0827 14.1588L21.4278 14.2784L22.0827 14.3979H22.0827C22.3287 14.443 22.5557 14.56 22.735 14.7343C22.9144 14.9086 23.0379 15.1321 23.09 15.3767L23.2341 16.0554L23.3782 15.3767Z" fill="white" />
    <defs><linearGradient id="paint0_linear_699_2698" x1="20.8614" y1="10.5926" x2="14.5398" y2="13.7534" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" />
      <stop offset="1" stopColor="white" stopOpacity="0" />
    </linearGradient></defs>
  </svg>;
};
var EthosWalletIcon_default = EthosWalletIcon;

// src/components/styled/InstallWallet.tsx
var InstallWallet = ({ walletInfos, width }) => {
  const icon = (data) => {
    if (!data)
      return <></>;
    if (typeof data === "string") {
      return <img src={data} height={32} width={32} />;
    }
    return data;
  };
  const installWallets = [
    {
      name: "Ethos Wallet",
      icon: <EthosWalletIcon_default />,
      link: "https://chrome.google.com/webstore/detail/ethos-wallet/mcbigmjiafegjnnogedioegffbooigli"
    },
    {
      name: "Sui Wallet",
      icon: <SuiEnclosed_default />,
      link: "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
    },
    ...walletInfos || []
  ];
  return <Header_default
    dappIcon={<InstallWalletIcon_default />}
    title="Install A Wallet"
    subTitle="Wallets allow you to interact with, store, send, and receive digital assets."
  ><div role="wallet-sign-in"><div style={walletOptionContainer(width)}>{installWallets?.map(
    (installWallet, index) => <a
      key={`install-wallet-${index}`}
      style={iconButton(width)}
      href={installWallet.link}
      target="_blank"
    >
      {installWallet.name}
      <div>{icon(installWallet.icon)}</div>
    </a>
  )}</div></div></Header_default>;
};
var InstallWallet_default = InstallWallet;

// src/hooks/useModal.ts
import { useContext } from "react";

// src/components/ConnectContext.tsx
import { createContext } from "react";
var defaultContents = {
  init: () => {
  }
};
var ConnectContext = createContext(defaultContents);
var ConnectContext_default = ConnectContext;

// src/hooks/useModal.ts
var useModal = () => {
  const { modal } = useContext(ConnectContext_default);
  return modal;
};
var useModal_default = useModal;

// src/hooks/useWallet.ts
import { useContext as useContext2 } from "react";

// src/enums/EthosConnectStatus.ts
var EthosConnectStatus = /* @__PURE__ */ ((EthosConnectStatus2) => {
  EthosConnectStatus2["Loading"] = "loading";
  EthosConnectStatus2["NoConnection"] = "no_connection";
  EthosConnectStatus2["Connected"] = "connected";
  return EthosConnectStatus2;
})(EthosConnectStatus || {});

// src/hooks/useWallet.ts
var useWallet = () => {
  const { wallet } = useContext2(ConnectContext_default);
  return wallet ?? { status: "loading" /* Loading */, provider: null, setAltAccount: () => {
  } };
};
var useWallet_default = useWallet;

// src/hooks/useWindowDimensions.ts
import { useState as useState2, useEffect as useEffect2 } from "react";
function getWindowDimensions() {
  if (typeof window === "undefined")
    return { width: 0, height: 0 };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState2(
    { width: 0, height: 0 }
  );
  useEffect2(() => {
    setWindowDimensions(getWindowDimensions());
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}

// src/hooks/hooks.ts
var hooks = {
  useModal: useModal_default,
  useWallet: useWallet_default,
  useWindowDimensions
};
var hooks_default = hooks;

// src/components/styled/MobileWallet.tsx
var MobileWallet = () => {
  return <div role="wallet-sign-in">
    <span style={ethosWalletTitleText()}>Connect A Mobile Wallet</span>
    <div style={walletExplanation()}><p>There are no mobile wallets yet on Sui.</p></div>
  </div>;
};
var MobileWallet_default = MobileWallet;

// src/components/styled/Or.tsx
var Or = () => {
  return <div style={strikeThroughOrContainer()}>
    <div style={line()} />
    {"or"}
    <div style={line()} />
  </div>;
};
var Or_default = Or;

// src/components/styled/SignInModal.tsx
function showSignInModal() {
  window.ethosInternal.showSignInModal();
}
function hideSignInModal() {
  window.ethosInternal.hideSignInModal();
}
var SignInModal = ({
  connectMessage,
  dappName,
  dappIcon,
  hideEmailSignIn,
  hideWalletSignIn,
  externalContext,
  preferredWallets
}) => {
  const { wallets, selectWallet } = externalContext?.wallet || hooks_default.useWallet();
  const { isModalOpen, openModal, closeModal } = externalContext?.modal || hooks_default.useModal();
  const [isOpenAll, setIsOpenAll] = useState3(isModalOpen);
  const [signingIn, setSigningIn] = useState3(false);
  const [emailSent, setEmailSent] = useState3(false);
  const { width } = hooks_default.useWindowDimensions();
  const closeOnClickId = "ethos-close-on-click";
  const [showEmail, setShowEmail] = useState3(false);
  const [showMobile, setShowMobile] = useState3(false);
  const [showInstallWallet, setShowInstallWallet] = useState3(false);
  const [safeDappName, setSafeDappName] = useState3(dappName);
  const [safeWallets, setSafeWallets] = useState3();
  useHandleElementWithIdClicked(closeOnClickId, closeModal);
  useEffect3(() => {
    window.ethosInternal ||= {};
    window.ethosInternal.showSignInModal = () => {
      openModal();
    };
    window.ethosInternal.hideSignInModal = () => {
      closeModal();
    };
    setIsOpenAll(isModalOpen);
  }, [isModalOpen, setIsOpenAll, openModal, closeModal]);
  useEffect3(() => {
    if (hideEmailSignIn && hideWalletSignIn) {
      throw new Error("hideEmailSignIn and hideWalletSignIn cannot both be true");
    }
  }, [hideEmailSignIn, hideWalletSignIn]);
  useEffect3(() => {
    if (!safeDappName) {
      setSafeDappName(document.title);
    }
  }, [safeDappName]);
  useEffect3(() => {
    let safeWallets2 = wallets || [];
    if (preferredWallets && preferredWallets.length > 0) {
      safeWallets2 = safeWallets2.sort(
        (a, b) => {
          let aIndex = preferredWallets.indexOf(a.name);
          if (aIndex === -1) {
            aIndex = safeWallets2.length;
          }
          let bIndex = preferredWallets.indexOf(b.name);
          if (bIndex === -1) {
            bIndex = safeWallets2.length;
          }
          return aIndex - bIndex;
        }
      );
    }
    log_default("preferredWallets", preferredWallets, safeWallets2);
    setSafeWallets(safeWallets2);
  }, [wallets, preferredWallets, log_default]);
  const _toggleInstallWallet = useCallback3(() => {
    setShowInstallWallet((prev) => !prev);
  }, []);
  const _toggleEmail = useCallback3(() => {
    setShowEmail((prev) => !prev);
  }, []);
  const _reset = useCallback3(() => {
    setShowInstallWallet(false);
    setShowMobile(false);
    setShowEmail(false);
  }, []);
  const safeConnectMessage = useMemo2(() => {
    if (connectMessage)
      return connectMessage;
    if (!safeDappName) {
      return <></>;
    }
    return <>
      {"Connect to "}
      <span style={highlighted()}>{safeDappName}</span>
    </>;
  }, [safeDappName, connectMessage]);
  const modalContent = useMemo2(() => {
    if (!safeWallets) {
      return <></>;
    }
    if (showMobile) {
      return <MobileWallet_default />;
    }
    if (showInstallWallet || hideEmailSignIn && safeWallets.length === 0) {
      return <InstallWallet_default width={width} />;
    }
    if (hideWalletSignIn) {
      return <Email_default
        setSigningIn={setSigningIn}
        setEmailSent={setEmailSent}
        width={width}
      />;
    }
    if (!showEmail && safeWallets.length > 0)
      return <Header_default
        title={safeConnectMessage}
        dappIcon={dappIcon}
        subTitle="Choose from your installed wallets"
      >
        <Wallets_default
          wallets={safeWallets}
          selectWallet={selectWallet}
          width={width}
        />
        {!hideEmailSignIn && <>
          <Or_default />
          <div style={submitButtonContainer()}><IconButton_default
            text="Sign In With Email"
            onClick={_toggleEmail}
            width={width}
            primary={true}
          /></div>
        </>}
      </Header_default>;
    return <Header_default
      title={safeConnectMessage}
      dappIcon={dappIcon}
      subTitle={`Log in to ${safeDappName}`}
    >
      <Email_default
        setSigningIn={setSigningIn}
        setEmailSent={setEmailSent}
        width={width}
      />
      {!hideWalletSignIn && <>
        <Or_default />
        <div style={submitButtonContainer()}>{safeWallets.length > 0 ? <IconButton_default
          icon={<WalletsIcon_default />}
          text="Select One Of Your Wallets"
          onClick={_toggleEmail}
          width={width}
        /> : <IconButton_default
          icon={<WalletsIcon_default />}
          text="Install A Wallet"
          onClick={_toggleInstallWallet}
          width={width}
        />}</div>
      </>}
    </Header_default>;
  }, [safeConnectMessage, safeDappName, hideEmailSignIn, hideWalletSignIn, safeWallets, showEmail, showMobile, showInstallWallet]);
  const subpage = useMemo2(() => {
    return showMobile || showInstallWallet;
  }, [showMobile, showInstallWallet]);
  const loader = useMemo2(() => <div style={loaderStyle()}><Loader_default width={50} /></div>, []);
  return <Dialog_default isOpenAll={isOpenAll}><ModalWrapper_default
    closeOnClickId={closeOnClickId}
    onClose={closeModal}
    isOpenAll={isOpenAll}
    width={width}
    back={subpage ? _reset : null}
  >{emailSent ? <EmailSent_default /> : signingIn ? loader : modalContent}</ModalWrapper_default></Dialog_default>;
};
var SignInModal_default = SignInModal;

// src/hooks/useContext.ts
import {
  useCallback as useCallback6,
  useEffect as useEffect7,
  useMemo as useMemo4,
  useState as useState6
} from "react";

// src/hooks/useAccount.ts
import { useEffect as useEffect4, useRef, useState as useState4 } from "react";
var useAccount = (signer, network) => {
  const [altAccount, setAltAccount] = useState4();
  const [account, setAccount] = useState4({});
  const latestNetwork = useRef(network);
  const existingContents = useRef();
  useEffect4(() => {
    if (!signer)
      return;
    latestNetwork.current = network;
    const initAccount = async () => {
      const address2 = altAccount?.address ?? signer.currentAccount?.address;
      if (!address2) {
        return;
      }
      setAccount((prev) => {
        if (prev.address === address2)
          return prev;
        return { ...prev, address: address2 };
      });
      const contents = await getWalletContents_default({
        address: address2,
        network,
        existingContents: existingContents.current
      });
      if (!contents || network !== latestNetwork.current || JSON.stringify(existingContents.current) === JSON.stringify(contents))
        return;
      existingContents.current = contents;
      setAccount((prev) => ({ ...prev, contents }));
    };
    initAccount();
    const interval = setInterval(initAccount, 5e3);
    return () => clearInterval(interval);
  }, [network, signer, altAccount]);
  return { account, altAccount, setAltAccount };
};
var useAccount_default = useAccount;

// src/hooks/useConnect.ts
import { useCallback as useCallback5, useEffect as useEffect6, useRef as useRef3, useState as useState5 } from "react";

// src/hooks/useWalletKit.ts
import { useCallback as useCallback4, useEffect as useEffect5, useMemo as useMemo3, useRef as useRef2, useSyncExternalStore } from "react";
import { createWalletKitCore } from "@mysten/wallet-kit-core";
import { UnsafeBurnerWalletAdapter, WalletStandardAdapterProvider } from "@mysten/wallet-adapter-all-wallets";
var useWalletKit = ({ defaultChain, configuredAdapters, features, enableUnsafeBurner, preferredWallets, storageAdapter, storageKey, disableAutoConnect }) => {
  const adapters = useMemo3(
    () => configuredAdapters ?? [
      new WalletStandardAdapterProvider({ features }),
      ...enableUnsafeBurner ? [new UnsafeBurnerWalletAdapter()] : []
    ],
    [configuredAdapters]
  );
  const walletKitRef = useRef2(null);
  if (!walletKitRef.current) {
    walletKitRef.current = createWalletKitCore({
      adapters,
      preferredWallets,
      storageAdapter,
      storageKey
    });
  }
  const { wallets, status, currentWallet, accounts, currentAccount } = useSyncExternalStore(
    walletKitRef.current.subscribe,
    walletKitRef.current.getState,
    walletKitRef.current.getState
  );
  useEffect5(() => {
    if (!disableAutoConnect) {
      walletKitRef.current?.autoconnect();
    }
  }, [status, wallets]);
  const { autoconnect, ...walletFunctions } = walletKitRef.current;
  const signAndExecuteTransactionBlock = useCallback4((input) => {
    if (!currentWallet || !currentAccount) {
      throw new Error("No wallet connect to sign message");
    }
    const account = input.account || currentAccount;
    const chain = input.chain || defaultChain || DEFAULT_CHAIN;
    return currentWallet.signAndExecuteTransactionBlock({
      ...input,
      account,
      chain
    });
  }, [currentWallet, currentAccount, defaultChain]);
  const signTransactionBlock = useCallback4((input) => {
    if (!currentWallet || !currentAccount) {
      throw new Error("No wallet connect to sign message");
    }
    const account = input.account || currentAccount;
    const chain = input.chain || defaultChain || DEFAULT_CHAIN;
    return currentWallet.signTransactionBlock({
      ...input,
      account,
      chain
    });
  }, [currentWallet, currentAccount, defaultChain]);
  const signMessage = useCallback4((input) => {
    if (!currentWallet || !currentAccount) {
      throw new Error("No wallet connect to sign message");
    }
    const account = input.account || currentAccount;
    const message = typeof input.message === "string" ? new Uint8Array(Buffer.from(input.message, "utf8")) : input.message;
    return currentWallet.signMessage({
      ...input,
      message,
      account
    });
  }, [currentWallet, currentAccount]);
  const requestPreapproval = useCallback4(async (preapproval) => {
    if (!currentWallet || !currentAccount) {
      throw new Error("No wallet connect to preapprove transactions");
    }
    const ethosWallet = window.ethosWallet;
    if (!ethosWallet || currentWallet.name !== "Ethos Wallet") {
      console.log("Wallet does not support preapproval");
      return false;
    }
    if (!preapproval.address) {
      preapproval.address = currentAccount.address;
    }
    if (!preapproval.chain) {
      preapproval.chain = defaultChain ?? DEFAULT_CHAIN;
    }
    return ethosWallet.requestPreapproval(preapproval);
  }, [currentWallet, currentAccount, defaultChain]);
  const constructedSigner = useMemo3(() => {
    if (!currentWallet || !currentAccount)
      return null;
    return {
      type: "extension" /* Extension */,
      name: currentWallet.name,
      icon: currentWallet.name === "Sui Wallet" ? "https://sui.io/favicon.png" : currentWallet.icon,
      getAddress: async () => currentAccount?.address,
      accounts,
      currentAccount,
      signAndExecuteTransactionBlock,
      signTransactionBlock,
      requestPreapproval,
      signMessage,
      disconnect: () => {
        currentWallet.disconnect();
        walletKitRef.current?.disconnect();
      }
    };
  }, [currentWallet, accounts, currentAccount, signAndExecuteTransactionBlock, requestPreapproval, signMessage]);
  return {
    wallets,
    status,
    signer: constructedSigner,
    ...walletFunctions
  };
};
var useWalletKit_default = useWalletKit;

// src/hooks/useConnect.ts
import { Connection as Connection2, JsonRpcProvider as JsonRpcProvider2 } from "@mysten/sui.js";
import { WalletKitCoreConnectionStatus } from "@mysten/wallet-kit-core";
var useConnect = (ethosConfiguration, onWalletConnected) => {
  const signerFound = useRef3(false);
  const methodsChecked = useRef3({
    "ethos": false,
    // 'mobile': false,
    "extension": false
  });
  const [providerAndSigner, setProviderAndSigner] = useState5({
    provider: null,
    signer: null
  });
  const {
    wallets,
    status: suiStatus,
    signer: suiSigner,
    getState,
    connect
  } = useWalletKit_default({
    defaultChain: ethosConfiguration?.chain ?? DEFAULT_CHAIN,
    preferredWallets: ethosConfiguration?.preferredWallets,
    disableAutoConnect: ethosConfiguration?.disableAutoConnect
  });
  const disconnect = useCallback5(() => {
    signerFound.current = false;
    methodsChecked.current = {
      "ethos": false,
      // 'mobile': false,
      "extension": false
    };
    setProviderAndSigner((prev) => ({
      ...prev,
      signer: null
    }));
  }, []);
  useEffect6(() => {
    signerFound.current = false;
    methodsChecked.current = {
      "ethos": false,
      // 'mobile': false,
      "extension": false
    };
  }, [ethosConfiguration]);
  useEffect6(() => {
    const { provider, signer } = providerAndSigner;
    if (!provider && !signer)
      return;
    const extensionState = getState();
    if (extensionState.isConnecting || extensionState.isError)
      return;
    onWalletConnected && onWalletConnected(providerAndSigner);
  }, [suiStatus, providerAndSigner, onWalletConnected, getState]);
  const checkSigner = useCallback5((signer, type) => {
    log_default("useConnect", "trying to set providerAndSigner", type, signerFound.current, methodsChecked.current);
    if (signerFound.current)
      return;
    if (type) {
      methodsChecked.current[type] = true;
    }
    const allMethodsChecked = !Object.values(methodsChecked.current).includes(false);
    if (!signer && !allMethodsChecked)
      return;
    signerFound.current = !!signer;
    const network = typeof ethosConfiguration?.network === "string" ? ethosConfiguration.network : DEFAULT_NETWORK;
    const connection = new Connection2({ fullnode: network });
    const provider = new JsonRpcProvider2(connection);
    if (signer) {
      const _disconnect = signer?.disconnect;
      signer.disconnect = () => {
        _disconnect();
        disconnect();
      };
    }
    setProviderAndSigner({ provider, signer });
  }, [disconnect]);
  useEffect6(() => {
    if (suiStatus === WalletKitCoreConnectionStatus.DISCONNECTED) {
      methodsChecked.current["extension"] = false;
      signerFound.current = false;
      setProviderAndSigner((prev) => ({
        ...prev,
        signer: null
      }));
    }
  }, [suiStatus]);
  useEffect6(() => {
    if (!ethosConfiguration)
      return;
    log_default("mobile", "listening to mobile connection from EthosConnectProvider");
  }, [checkSigner, ethosConfiguration]);
  useEffect6(() => {
    if (!ethosConfiguration)
      return;
    const state = getState();
    log_default("useConnect", "Setting providerAndSigner extension", state);
    if (state.isConnecting || state.isError)
      return;
    checkSigner(suiSigner, "extension");
  }, [suiStatus, getState, checkSigner, suiSigner, ethosConfiguration]);
  useEffect6(() => {
    if (!ethosConfiguration)
      return;
    if (!ethosConfiguration.apiKey) {
      log_default("useConnect", "Setting null providerAndSigner ethos");
      checkSigner(null, "ethos");
      return;
    }
    const fetchEthosSigner = async () => {
      const signer = await lib_default.getEthosSigner({ defaultChain: ethosConfiguration.chain ?? DEFAULT_CHAIN });
      log_default("useConnect", "Setting providerAndSigner ethos", signer);
      checkSigner(signer, "ethos");
    };
    fetchEthosSigner();
  }, [checkSigner, ethosConfiguration]);
  return { wallets, providerAndSigner, connect, getState };
};
var useConnect_default = useConnect;

// src/hooks/useContext.ts
var DEFAULT_CONFIGURATION = {
  network: DEFAULT_NETWORK,
  chain: DEFAULT_CHAIN,
  walletAppUrl: "https://ethoswallet.xyz"
};
var useContext3 = ({ configuration, onWalletConnected }) => {
  const [ethosConfiguration, setEthosConfiguration] = useState6({
    ...DEFAULT_CONFIGURATION,
    ...configuration
  });
  const [isModalOpen, setIsModalOpen] = useState6(false);
  const init = useCallback6((config) => {
    log_default("EthosConnectProvider", "EthosConnectProvider Configuration:", config);
    const fullConfiguration = {
      ...DEFAULT_CONFIGURATION,
      ...config
    };
    lib_default.initializeEthos(fullConfiguration);
    setEthosConfiguration((prev) => {
      if (JSON.stringify(fullConfiguration) !== JSON.stringify(prev)) {
        return fullConfiguration;
      } else {
        return prev;
      }
    });
  }, []);
  useEffect7(() => {
    lib_default.initializeEthos(ethosConfiguration);
  }, [ethosConfiguration]);
  useEffect7(() => {
    if (!configuration)
      return;
    if (JSON.stringify(ethosConfiguration) === JSON.stringify(configuration))
      return;
    init(configuration);
  }, [ethosConfiguration, configuration]);
  const _onWalletConnected = useCallback6((providerAndSigner2) => {
    setIsModalOpen(false);
    onWalletConnected && onWalletConnected(providerAndSigner2);
  }, [onWalletConnected]);
  const {
    wallets,
    connect: selectWallet,
    providerAndSigner,
    getState
  } = useConnect_default(ethosConfiguration, _onWalletConnected);
  const {
    account: { address: address2, contents },
    altAccount,
    setAltAccount
  } = useAccount_default(providerAndSigner.signer, ethosConfiguration?.network ?? DEFAULT_NETWORK);
  const modal = useMemo4(() => {
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
    return {
      isModalOpen,
      openModal,
      closeModal
    };
  }, [isModalOpen, setIsModalOpen]);
  const wallet = useMemo4(() => {
    const { provider, signer } = providerAndSigner;
    const extensionState = getState();
    let status;
    if (signer?.type === "hosted") {
      status = "connected" /* Connected */;
    } else if (extensionState.isConnecting) {
      status = "loading" /* Loading */;
    } else if (provider && extensionState.isConnected) {
      status = "connected" /* Connected */;
    } else {
      status = "no_connection" /* NoConnection */;
    }
    const context = {
      status,
      wallets: wallets.map((w) => ({
        ...w,
        name: w.name,
        icon: w.icon
      })),
      selectWallet,
      provider,
      altAccount,
      setAltAccount
    };
    if (signer && address2) {
      context.wallet = {
        ...signer,
        address: address2,
        contents
      };
    }
    return context;
  }, [
    wallets,
    selectWallet,
    address2,
    altAccount,
    setAltAccount,
    providerAndSigner,
    contents,
    ethosConfiguration
  ]);
  useEffect7(() => {
    if (isModalOpen) {
      document.getElementsByTagName("html").item(0)?.setAttribute("style", "overflow: hidden;");
    } else {
      document.getElementsByTagName("html").item(0)?.setAttribute("style", "");
    }
  }, [isModalOpen]);
  const value = useMemo4(() => ({
    wallet,
    modal,
    providerAndSigner
  }), [wallet, modal, providerAndSigner]);
  return { ...value, ethosConfiguration, init };
};
var useContext_default = useContext3;

// src/components/EthosConnectProvider.tsx
var EthosConnectProvider = ({ ethosConfiguration, onWalletConnected, connectMessage, dappName, dappIcon, children }) => {
  const context = useContext_default({ configuration: ethosConfiguration || {}, onWalletConnected });
  return <ConnectContext_default.Provider value={context}>
    {children}
    <SignInModal_default
      isOpen={context.modal?.isModalOpen || false}
      hideEmailSignIn={context.ethosConfiguration?.hideEmailSignIn || false}
      hideWalletSignIn={context.ethosConfiguration?.hideWalletSignIn || false}
      connectMessage={connectMessage}
      dappName={dappName}
      dappIcon={dappIcon}
      preferredWallets={ethosConfiguration?.preferredWallets}
    />
  </ConnectContext_default.Provider>;
};
var EthosConnectProvider_default = EthosConnectProvider;

// src/components/styled/SignInButton.tsx
import { useCallback as useCallback7 } from "react";

// src/components/headless/WorkingButton.tsx
var WorkingButton = (props) => {
  const { children, isWorking, workingComponent, ...reactProps } = props;
  return <button {...reactProps}>{isWorking ? workingComponent || <span className="block p-2"><Loader_default width={32} /></span> : <>{children}</>}</button>;
};
var WorkingButton_default = WorkingButton;

// src/components/styled/SignInButton.tsx
var SignInButton = (props) => {
  const { children, onClick, externalContext, ...reactProps } = props;
  const { openModal } = externalContext?.modal || useModal_default();
  const _onClick = useCallback7((e) => {
    openModal();
    onClick && onClick(e);
  }, [openModal, onClick]);
  return <><WorkingButton_default onClick={_onClick} {...reactProps} style={buttonDefault(props.style)}>{children || <>Sign In</>}</WorkingButton_default></>;
};
var SignInButton_default = SignInButton;
var buttonDefault = (providedStyles) => ({
  lineHeight: "21px",
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "14px",
  ...providedStyles || {}
});

// src/components/headless/HoverColorButton.tsx
import { useCallback as useCallback8, useState as useState7 } from "react";
var HoverColorButton = (props) => {
  const { hoverBackgroundColor, hoverChildren, children, style, ...workingButtonProps } = props;
  const [hover, setHover] = useState7(false);
  const onMouseEnter = useCallback8(() => {
    setHover(true);
  }, []);
  const onMouseLeave = useCallback8(() => {
    setHover(false);
  }, []);
  return <WorkingButton_default
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{
      ...style,
      backgroundColor: hover ? hoverBackgroundColor || primaryColor : void 0,
      color: hover ? "white" : "black"
    }}
    {...workingButtonProps}
  >{hover ? hoverChildren : children}</WorkingButton_default>;
};
var HoverColorButton_default = HoverColorButton;

// src/components/styled/AddressWidget.tsx
import { useCallback as useCallback12, useState as useState8 } from "react";

// src/lib/truncateMiddle.ts
var truncateMiddle = (text, length = 6) => text ? `${text.slice(0, length)}...${text.slice(length * -1)}` : "";
var truncateMiddle_default = truncateMiddle;

// src/components/svg/Sui.tsx
var Sui = ({ width = 24, color = "#6EBCEE" }) => <svg
  id="SuiSvg"
  xmlns="http://www.w3.org/2000/svg"
  width={width}
  height={width * (40 / 28)}
  viewBox="-1 0 28 40"
  style={{ display: "block", verticalAlign: "middle" }}
><path
  d="M1.8611,33.0541a13.6477,13.6477,0,0,0,23.7778,0,13.89,13.89,0,0,0,0-13.8909L15.1824.8368a1.6444,1.6444,0,0,0-2.8648,0L1.8611,19.1632A13.89,13.89,0,0,0,1.8611,33.0541ZM10.8044,9.5555,13.0338,5.648a.8222.8222,0,0,1,1.4324,0L23.043,20.68a10.8426,10.8426,0,0,1,.8873,8.8828,9.4254,9.4254,0,0,0-.4388-1.4586c-1.1847-3.0254-3.8634-5.36-7.9633-6.9393-2.8187-1.0819-4.618-2.6731-5.3491-4.73C9.2375,13.7848,10.221,10.8942,10.8044,9.5555ZM7.0028,16.2184,4.457,20.68a10.8569,10.8569,0,0,0,0,10.8582,10.6776,10.6776,0,0,0,16.1566,2.935,7.5061,7.5061,0,0,0,.0667-5.2913c-.87-2.1858-2.9646-3.9308-6.2252-5.1876-3.6857-1.4147-6.08-3.6233-7.1157-6.5625A9.297,9.297,0,0,1,7.0028,16.2184Z"
  style={{ fill: color, fillRule: "evenodd" }}
/></svg>;
var Sui_default = Sui;

// src/components/styled/CopyWalletAddressButton.tsx
import { useCallback as useCallback9 } from "react";

// src/components/styled/MenuButton.tsx
var MenuButton = (props) => {
  return <HoverColorButton_default
    {...props}
    style={button()}
  />;
};
var MenuButton_default = MenuButton;
var button = () => ({
  width: "100%",
  borderRadius: "12px",
  textAlign: "left",
  padding: "6px 12px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  border: "none",
  fontFamily: "inherit",
  cursor: "pointer"
});

// src/components/styled/CopyWalletAddressButton.tsx
var CopyWalletAddressButton = (props) => {
  const { externalContext, ...buttonProps } = props;
  const { wallet } = externalContext?.wallet || useWallet_default();
  const children = useCallback9((hover) => <>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path
      d="M15.6657 3.88789C15.3991 2.94272 14.5305 2.25 13.5 2.25H10.5C9.46954 2.25 8.60087 2.94272 8.33426 3.88789M15.6657 3.88789C15.7206 4.0825 15.75 4.28782 15.75 4.5V4.5C15.75 4.91421 15.4142 5.25 15 5.25H9C8.58579 5.25 8.25 4.91421 8.25 4.5V4.5C8.25 4.28782 8.27937 4.0825 8.33426 3.88789M15.6657 3.88789C16.3119 3.93668 16.9545 3.99828 17.5933 4.07241C18.6939 4.20014 19.5 5.149 19.5 6.25699V19.5C19.5 20.7426 18.4926 21.75 17.25 21.75H6.75C5.50736 21.75 4.5 20.7426 4.5 19.5V6.25699C4.5 5.149 5.30608 4.20014 6.40668 4.07241C7.04547 3.99828 7.68808 3.93668 8.33426 3.88789"
      stroke={hover ? "white" : "black"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    /></svg>
    {"Copy Wallet Address"}
  </>, []);
  const onClick = useCallback9((e) => {
    const element = e.target;
    const innerHTML = element.innerHTML;
    element.innerHTML = "Copied!";
    navigator.clipboard.writeText(wallet?.address || "");
    setTimeout(() => {
      element.innerHTML = innerHTML;
    }, 1e3);
  }, [wallet]);
  return <MenuButton_default
    {...buttonProps}
    onClick={onClick}
    hoverChildren={children(true)}
  >{children(false)}</MenuButton_default>;
};
var CopyWalletAddressButton_default = CopyWalletAddressButton;

// src/components/styled/WalletExplorerButton.tsx
import { useCallback as useCallback10 } from "react";
var WalletExplorerButton = (props) => {
  const children = useCallback10((hover) => <>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path
      d="M12 21C16.1926 21 19.7156 18.1332 20.7157 14.2529M12 21C7.80742 21 4.28442 18.1332 3.2843 14.2529M12 21C14.4853 21 16.5 16.9706 16.5 12C16.5 7.02944 14.4853 3 12 3M12 21C9.51472 21 7.5 16.9706 7.5 12C7.5 7.02944 9.51472 3 12 3M12 3C15.3652 3 18.299 4.84694 19.8431 7.58245M12 3C8.63481 3 5.70099 4.84694 4.15692 7.58245M19.8431 7.58245C17.7397 9.40039 14.9983 10.5 12 10.5C9.00172 10.5 6.26027 9.40039 4.15692 7.58245M19.8431 7.58245C20.5797 8.88743 21 10.3946 21 12C21 12.778 20.9013 13.5329 20.7157 14.2529M20.7157 14.2529C18.1334 15.6847 15.1619 16.5 12 16.5C8.8381 16.5 5.86662 15.6847 3.2843 14.2529M3.2843 14.2529C3.09871 13.5329 3 12.778 3 12C3 10.3946 3.42032 8.88743 4.15692 7.58245"
      stroke={hover ? "white" : "black"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    /></svg>
    {"Wallet Explorer"}
  </>, []);
  const onClick = useCallback10(() => {
    window.open("https://ethoswallet.xyz/dashboard", "_blank");
  }, []);
  return <MenuButton_default
    {...props}
    onClick={onClick}
    hoverChildren={children(true)}
  >{children(false)}</MenuButton_default>;
};
var WalletExplorerButton_default = WalletExplorerButton;

// src/components/styled/LogoutButton.tsx
import { useCallback as useCallback11 } from "react";
var LogoutButton = (props) => {
  const { externalContext, ...buttonProps } = props;
  const { wallet } = externalContext?.wallet || useWallet_default();
  const children = useCallback11((hover) => <>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path
      d="M13.5 21V20.25V21ZM7.5 21V21.75V21ZM5.25 18.75H6H5.25ZM5.25 5.25H4.5H5.25ZM7.5 3V2.25V3ZM13.5 3V3.75V3ZM15.75 5.25L15 5.25V5.25H15.75ZM15 9C15 9.41421 15.3358 9.75 15.75 9.75C16.1642 9.75 16.5 9.41421 16.5 9H15ZM16.5 15C16.5 14.5858 16.1642 14.25 15.75 14.25C15.3358 14.25 15 14.5858 15 15H16.5ZM15.75 18.75H16.5H15.75ZM18.2197 14.4697C17.9268 14.7626 17.9268 15.2374 18.2197 15.5303C18.5126 15.8232 18.9874 15.8232 19.2803 15.5303L18.2197 14.4697ZM21.75 12L22.2803 12.5303C22.5732 12.2374 22.5732 11.7626 22.2803 11.4697L21.75 12ZM19.2803 8.46967C18.9874 8.17678 18.5126 8.17678 18.2197 8.46967C17.9268 8.76256 17.9268 9.23744 18.2197 9.53033L19.2803 8.46967ZM9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75V11.25ZM13.5 20.25H7.5V21.75H13.5V20.25ZM6 18.75L6 5.25H4.5L4.5 18.75H6ZM7.5 3.75L13.5 3.75V2.25L7.5 2.25V3.75ZM15 5.25V9H16.5V5.25H15ZM15 15V18.75H16.5V15H15ZM6 5.25C6 4.42157 6.67157 3.75 7.5 3.75V2.25C5.84315 2.25 4.5 3.59315 4.5 5.25H6ZM7.5 20.25C6.67157 20.25 6 19.5784 6 18.75H4.5C4.5 20.4069 5.84315 21.75 7.5 21.75V20.25ZM13.5 21.75C15.1569 21.75 16.5 20.4069 16.5 18.75H15C15 19.5784 14.3284 20.25 13.5 20.25V21.75ZM13.5 3.75C14.3284 3.75 15 4.42157 15 5.25L16.5 5.25C16.5 3.59315 15.1569 2.25 13.5 2.25V3.75ZM19.2803 15.5303L22.2803 12.5303L21.2197 11.4697L18.2197 14.4697L19.2803 15.5303ZM22.2803 11.4697L19.2803 8.46967L18.2197 9.53033L21.2197 12.5303L22.2803 11.4697ZM21.75 11.25L9 11.25V12.75L21.75 12.75V11.25Z"
      fill={hover ? "white" : "black"}
    /></svg>
    {"Log Out"}
  </>, []);
  return <MenuButton_default
    {...buttonProps}
    onClick={wallet?.disconnect}
    hoverChildren={children(true)}
  >{children(false)}</MenuButton_default>;
};
var LogoutButton_default = LogoutButton;

// src/components/styled/AddressWidget.tsx
import { useEffect as useEffect8 } from "react";

// src/enums/AddressWidgetButtons.ts
var AddressWidgetButtons = /* @__PURE__ */ ((AddressWidgetButtons2) => {
  AddressWidgetButtons2["CopyWalletAddress"] = "copy_wallet_address";
  AddressWidgetButtons2["WalletExplorer"] = "wallet_explorer";
  AddressWidgetButtons2["Logout"] = "logout";
  return AddressWidgetButtons2;
})(AddressWidgetButtons || {});

// src/components/styled/AddressWidget.tsx
var AddressWidget = ({
  includeMenu = true,
  buttonColor = primaryColor,
  extraButtons = [],
  excludeButtons = [],
  externalContext
}) => {
  const { wallet } = externalContext?.wallet || useWallet_default();
  const [showMenu, setShowMenu] = useState8(false);
  useEffect8(() => {
    if (!wallet) {
      setShowMenu(false);
    }
  }, [wallet]);
  const onMouseEnter = useCallback12(() => {
    if (!wallet)
      return;
    setShowMenu(true);
  }, [wallet]);
  const onMouseLeave = useCallback12(() => {
    if (!wallet)
      return;
    setShowMenu(false);
  }, [wallet]);
  return <div style={container()} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div style={primary()}>
      <div><Sui_default color="#222532" width={12} /></div>
      {wallet ? <>
        <div style={sui()}>
          {formatBalance(wallet.contents?.suiBalance)}
          {" "}
          {"Sui"}
        </div>
        <div style={address()}>
          {wallet.icon && <img
            style={walletIcon()}
            src={wallet.icon}
          />}
          {truncateMiddle_default(wallet.address)}
        </div>
      </> : <SignInButton_default style={signIn()} externalContext={externalContext} />}
    </div>
    {includeMenu && showMenu && <div style={menu()}>
      {!excludeButtons.includes("copy_wallet_address" /* CopyWalletAddress */) && <CopyWalletAddressButton_default
        externalContext={externalContext}
        hoverBackgroundColor={buttonColor}
      />}
      {!excludeButtons.includes("wallet_explorer" /* WalletExplorer */) && <WalletExplorerButton_default
        hoverBackgroundColor={buttonColor}
      />}
      {extraButtons}
      {!excludeButtons.includes("logout" /* Logout */) && <LogoutButton_default
        externalContext={externalContext}
        hoverBackgroundColor={buttonColor}
      />}
    </div>}
  </div>;
};
var AddressWidget_default = AddressWidget;
var container = () => ({
  position: "relative",
  backgroundColor: "white",
  padding: "6px 12px 6px 18px",
  boxShadow: "1px 1px 3px 1px #dfdfe0",
  borderRadius: "18px",
  fontSize: "14px",
  color: "black"
});
var primary = () => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px"
});
var sui = () => ({
  whiteSpace: "nowrap"
});
var address = () => ({
  borderRadius: "30px",
  backgroundColor: "#f2f1f0",
  padding: "6px 12px",
  display: "flex",
  alignItems: "center",
  gap: "6px"
});
var menu = () => ({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: "12px 18px",
  position: "absolute",
  bottom: 0,
  left: "12px",
  right: "12px",
  transform: "translateY(100%)",
  boxShadow: "1px 1px 3px 1px #dfdfe0",
  borderBottomLeftRadius: "18px",
  borderBottomRightRadius: "18px",
  backgroundColor: "white",
  zIndex: "99"
});
var signIn = () => ({
  padding: "0 12px 0 0",
  background: "none",
  whiteSpace: "nowrap"
});
var walletIcon = () => ({
  width: "20px",
  height: "20px"
});

// src/lib/logout.ts
var logout = async (signer, fromWallet = false) => {
  log_default("logout", `-- Wallet ${fromWallet} --`, `-- Is Extension: ${signer?.type} --`, `-- Disconnect: ${!!signer?.disconnect} --`, "signer", signer);
  if (signer.type === "extension" || !fromWallet) {
    await signer.disconnect();
  } else {
    await signer.logout();
  }
};
var logout_default = logout;

// src/lib/preapprove.ts
var preapprove = async ({ signer, preapproval }) => {
  return signer.requestPreapproval(preapproval);
};
var preapprove_default = preapprove;

// src/lib/sign.ts
var sign = async ({ signer, message }) => {
  return signer.sign({ message });
};
var sign_default = sign;

// src/lib/transact.ts
var transact = async ({
  signer,
  transactionInput
}) => {
  log_default("transact", "Starting transaction", signer, transactionInput);
  return signer.signAndExecuteTransactionBlock(transactionInput);
};
var transact_default = transact;

// src/lib/hideWallet.ts
var hideWallet = (signer) => {
  if (signer.type === "extension" /* Extension */)
    return;
  getIframe_default(false);
};
var hideWallet_default = hideWallet;

// src/lib/showWallet.ts
var showWallet = (signer) => {
  if (signer.type === "extension" /* Extension */)
    return;
  getIframe_default(true);
};
var showWallet_default = showWallet;

// src/lib/dripSui.ts
import { Connection as Connection3, JsonRpcProvider as JsonRpcProvider3 } from "@mysten/sui.js";
var dripSui = async ({ address: address2, network, faucet }) => {
  const connection = new Connection3({ fullnode: network ?? DEFAULT_NETWORK, faucet: `${faucet ?? DEFAULT_FAUCET}gas` });
  const provider = new JsonRpcProvider3(connection);
  return provider.requestSuiFromFaucet(address2);
};
var dripSui_default = dripSui;

// src/lib/nameService.ts
import _2 from "lodash";
import { Connection as Connection4, JsonRpcProvider as JsonRpcProvider4, TransactionBlock } from "@mysten/sui.js";
var PACKAGE_ADDRESS = "0xe7ed73e4c2c1b38729155bf5c44dc4496a9edd2f";
var REGISTRY_ADDRESS = "0xa378adb13792599e8eb8c7e4f2e938863921e4f4";
var SENDER = "0x0000000000000000000000000000000000000002";
var DEV_INSPECT_RESULT_PATH_0 = "results.Ok[0][1].returnValues[0][0]";
var DEV_INSPECT_RESULT_PATH_1 = "results.Ok[0][1].returnValues[1][0]";
var toHexString = (byteArray) => byteArray?.length > 0 ? Array.from(byteArray, (byte) => ("0" + (byte & 255).toString(16)).slice(-2)).join("") : "";
var toString = (byteArray) => byteArray?.length > 0 ? new TextDecoder().decode(Buffer.from(byteArray.slice(1)).buffer) : "";
var trimAddress = (address2) => String(address2?.match(/0x0{0,}([\w\d]+)/)?.[1]);
var toFullAddress = (trimmedAddress) => trimmedAddress ? `0x${trimmedAddress.padStart(40, "0")}` : "";
var getSuiName = async (address2, network, sender = SENDER) => {
  const connection = new Connection4({ fullnode: network || DEFAULT_NETWORK });
  const suiProvider = new JsonRpcProvider4(connection);
  try {
    const registryTx = new TransactionBlock();
    registryTx.add(
      TransactionBlock.Transactions.MoveCall({
        target: `${PACKAGE_ADDRESS}::base_registry::get_record_by_key`,
        arguments: [
          registryTx.object(REGISTRY_ADDRESS),
          registryTx.pure(`${trimAddress(address2)}.addr.reverse`)
        ]
      })
    );
    const resolverBytes = _2.get(
      await suiProvider.devInspectTransactionBlock({
        transactionBlock: registryTx,
        sender
      }),
      DEV_INSPECT_RESULT_PATH_1
    );
    if (!resolverBytes)
      return address2;
    const resolver = toFullAddress(toHexString(resolverBytes));
    const resolverTx = new TransactionBlock();
    resolverTx.add(
      TransactionBlock.Transactions.MoveCall({
        target: `${PACKAGE_ADDRESS}::resolver::name`,
        arguments: [
          registryTx.object(resolver),
          registryTx.pure(address2)
        ]
      })
    );
    const resolverResponse = await suiProvider.devInspectTransactionBlock({
      transactionBlock: resolverTx,
      sender
    });
    const nameByteArray = _2.get(resolverResponse, DEV_INSPECT_RESULT_PATH_0);
    if (!nameByteArray)
      return address2;
    const name = toString(nameByteArray);
    return name;
  } catch (e) {
    console.log("Error retreiving SuiNS Name", e);
    return address2;
  }
};
var getSuiAddress = async (domain, network, sender = SENDER) => {
  const connection = new Connection4({ fullnode: network || DEFAULT_NETWORK });
  const suiProvider = new JsonRpcProvider4(connection);
  try {
    const registryTx = new TransactionBlock();
    registryTx.add(
      TransactionBlock.Transactions.MoveCall({
        target: `${PACKAGE_ADDRESS}::base_registry::get_record_by_key`,
        arguments: [
          registryTx.object(REGISTRY_ADDRESS),
          registryTx.pure(domain)
        ]
      })
    );
    const resolverResponse = await suiProvider.devInspectTransactionBlock({
      transactionBlock: registryTx,
      sender
    });
    const resolverBytes = _2.get(resolverResponse, DEV_INSPECT_RESULT_PATH_1);
    if (!resolverBytes)
      return domain;
    const resolver = toFullAddress(toHexString(resolverBytes));
    const resolverTx = new TransactionBlock();
    resolverTx.add(
      TransactionBlock.Transactions.MoveCall({
        target: `${PACKAGE_ADDRESS}::resolver::addr`,
        arguments: [
          registryTx.object(resolver),
          registryTx.pure(domain)
        ]
      })
    );
    const resolverResponse2 = await suiProvider.devInspectTransactionBlock({
      transactionBlock: resolverTx,
      sender
    });
    const addr = _2.get(resolverResponse2, DEV_INSPECT_RESULT_PATH_0);
    if (!addr)
      return domain;
    return toFullAddress(toHexString(addr));
  } catch (e) {
    console.log("Error retrieving address from SuiNS name", e);
    return domain;
  }
};

// src/hooks/useProviderAndSigner.ts
import { useContext as useContext4 } from "react";
var useProviderAndSigner = () => {
  const { providerAndSigner } = useContext4(ConnectContext_default);
  return providerAndSigner || { provider: null, signer: null };
};
var useProviderAndSigner_default = useProviderAndSigner;

// src/hooks/useAddress.ts
var useAddress = () => {
  const { signer } = useProviderAndSigner_default();
  return signer?.currentAccount?.address;
};
var useAddress_default = useAddress;

// src/hooks/useContents.ts
import { useContext as useContext5 } from "react";
var useContents = () => {
  const contents = useContext5(ConnectContext_default).wallet?.wallet?.contents;
  return contents;
};
var useContents_default = useContents;

// src/components/DetachedEthosConnectProvider.tsx
var DetachedEthosConnectProvider = ({ context, connectMessage, dappName, dappIcon, children }) => {
  return <>
    {children}
    <SignInModal_default
      isOpen={context.modal.isModalOpen}
      hideEmailSignIn={context.ethosConfiguration?.hideEmailSignIn || false}
      hideWalletSignIn={context.ethosConfiguration?.hideWalletSignIn || false}
      connectMessage={connectMessage}
      dappName={dappName}
      dappIcon={dappIcon}
      externalContext={context}
    />
  </>;
};
var DetachedEthosConnectProvider_default = DetachedEthosConnectProvider;

// src/index.ts
var components = {
  AddressWidget: AddressWidget_default,
  MenuButton: MenuButton_default,
  headless: {
    HoverColorButton: HoverColorButton_default
  }
};
var enums = {
  AddressWidgetButtons
};
var ethos = {
  login: login_default,
  logout: logout_default,
  sign: sign_default,
  transact: transact_default,
  preapprove: preapprove_default,
  showWallet: showWallet_default,
  hideWallet: hideWallet_default,
  showSignInModal,
  hideSignInModal,
  useProviderAndSigner: useProviderAndSigner_default,
  useAddress: useAddress_default,
  useContents: useContents_default,
  useWallet: useWallet_default,
  useContext: useContext_default,
  getWalletContents: getWalletContents_default,
  dripSui: dripSui_default,
  getSuiName,
  getSuiAddress,
  formatBalance,
  truncateMiddle: truncateMiddle_default,
  ipfsConversion,
  components,
  enums
};
export {
  Chain,
  DetachedEthosConnectProvider_default as DetachedEthosConnectProvider,
  EthosConnectProvider_default as EthosConnectProvider,
  EthosConnectStatus,
  IntentScope,
  SignInButton_default as SignInButton,
  TransactionBlock2 as TransactionBlock,
  ethos,
  verifyMessage
};
