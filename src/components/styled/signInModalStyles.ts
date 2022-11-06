/*
How to convert tailwind to inline CSS:
Paste the tailwind styless into https://tailwind-to-css.vercel.app/
Set aside the media queries
Paste that output into https://staxmanade.com/CssToReact/
Add media queries using `modalInnerWrapperStyle` as an example
*/

import { Breakpoints } from "../../enums/Breakpoints"

const COLOR_LIGHT_TEXT_MEDIUM = '#74777C';

/*
FONTS
*/

export const ethosWalletTitleText = () => (
  {
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: '600',
    marginLeft: '10px'
  } as React.CSSProperties
)

export const secondaryHeaderText = () => (
  {
    color: "#999999",
    fontSize: "14px",
    lineHeight: "24px"
  } as React.CSSProperties
)

export const secondaryText = () => (
  {
    color: "#6B7280",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  } as React.CSSProperties
)

export const signInOptionSubtitleText = () => (
  {
    fontSize: "14px",
    fontWeight: "600"
  } as React.CSSProperties
)

export const buttonText = () => (
  {
    color: '#5B5D5F',
  } as React.CSSProperties
)

/*
end FONTS
*/

export const dialog = (isOpen: boolean) =>
({
  visibility: isOpen ? '' : 'hidden',
  position: 'relative',
  zIndex: '100'
} as React.CSSProperties)

export const backdrop = (isOpen: boolean) =>
// fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity
({
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
  backgroundColor: 'rgb(107 114 128)',
  opacity: isOpen ? '.75' : '0',
  transition: 'all 300ms ease-in-out',
} as React.CSSProperties)

export const highlighted = () =>
({
  color: '#6D28D9'
} as React.CSSProperties)

export const missingMessage = () =>
({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "9px 18px",
  gap: "2px",
  background: "#F2F2F2",
  borderRadius: "6px"
} as React.CSSProperties)

export const modalOuterWrapper = (isOpen: boolean) =>
// fixed z-10 inset-0 overflow-y-auto
({
  position: 'fixed',
  zIndex: '99',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
  overflowY: 'auto',
  opacity: isOpen ? '1' : '0',
  scale: isOpen ? '1' : '.95',
  transition: 'all 300ms ease-in-out'

} as React.CSSProperties)

export const modalInnerWrapper = (width: number): React.CSSProperties => {
  // flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0
  const styles = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: '100%',
    padding: '1rem' /* 16px */,
    textAlign: 'center',
  }
  const sm = {
    padding: '0',
    alignItems: 'center',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const dialogPanel = (width: number) => {
  // relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6
  const styles = {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ffffff',
    transitionProperty: 'all',
    borderRadius: '0.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  }
  const sm = {
    width: '360px',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const topPanelStyle = () =>
({
  padding: '24px 24px 0px',
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"

} as React.CSSProperties)

export const closeStyle = () =>
({
  width: '24px',
  height: '24px',
  color: '#A0AEBA',
  cursor: 'pointer',
} as React.CSSProperties)


export const backStyle = () =>
({
  color: COLOR_LIGHT_TEXT_MEDIUM,
  cursor: 'pointer',
  display: 'flex',
  gap: "6px",
  alignItems: 'center'
} as React.CSSProperties)

export const backStyleText = () =>
({
  fontSize: '16px',
  lineHeight: '24px'
} as React.CSSProperties)

export const headerStyle = (withIcon=false) =>
({
  padding: withIcon ? '24px 24px 32px' : '0 24px 32px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '12px',
} as React.CSSProperties)

export const headerLogosStyle = () =>
({
  display: 'flex',
  justifyContent: 'center',
  gap: "-6px"
} as React.CSSProperties)

export const titleStyle = () =>
({
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '32px',
  margin: '0',
} as React.CSSProperties)

export const subTitleStyle = () =>
({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
  margin: '0',
  color: COLOR_LIGHT_TEXT_MEDIUM
} as React.CSSProperties)

export const mainContentStyle = (width: number) => {
  const styles = {
    justifyContent: 'space-between',
  }
  const sm = {
    display: 'flex',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const checkMarkCircleStyle = () => (
  {
    display: "flex",
    margin: "auto",
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    width: "3rem",
    height: "3rem",
    borderRadius: "9999px"
  } as React.CSSProperties)

export const walletOptionsStyle = (width: number) => {
  const styles = {
    padding: '18px',
    gap: '6px',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid rgb(241 245 249)',
  }
  const sm = {
    width: '300px',
    padding: '24px 12px',
    borderRight: '1px solid rgb(241 245 249)',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const walletOptionStyle = (selected = false) =>
({
  padding: '12px',
  backgroundColor: selected ? '#F3E8FE' : '#F9FAFB',
  borderRadius: '0.5rem',
  fontWeight: '500',
  cursor: 'pointer',
} as React.CSSProperties)

export const walletOptionButtonStyle = () =>
({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  gap: '0.5rem',
  border: 'none',
  background: 'none',
  textDecoration: 'none',
  cursor: 'pointer'
} as React.CSSProperties)

export const socialLoginButtonsStyle = () => ({
  padding: '12px 0',
  display: 'flex',
  gap: '6px'
})

export const socialLoginButtonStyle = () => ({
  cursor: 'pointer'
})

export const registrationStyle = (width: number) => {
  const styles = {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexGrow: '1'
  }
  const sm = {
    padding: '24px',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const qrCodeStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
} as React.CSSProperties)

export const registrationHeaderStyle = () =>
({
  fontWeight: '500',
  margin: '0',
} as React.CSSProperties)

export const centeredRegistrationHeaderStyle = () =>
({
  fontWeight: '500',
  margin: '0',
  textAlign: 'center'
} as React.CSSProperties)

export const subheaderStyle = () =>
({
  margin: '6px 0',
  fontSize: 'smaller',
  textAlign: 'center'
} as React.CSSProperties)

export const strikeThroughOrContainer = () => (
  {
    padding: "0px 24px 24px",
    display: "flex",
    flexDirection: "row",
    gap: "12px",
    justifyContent: "space-between",
    alignItems: "center",
    color: COLOR_LIGHT_TEXT_MEDIUM
  } as React.CSSProperties
)

export const line = () => (
  {
    height: '1px',
    width: '100%',
    background: "rgba(0, 0, 0, 0.12)",
    borderRadius: "16px"
  } as React.CSSProperties
)

export const emailInput = () =>
({
  boxSizing: 'border-box',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '16px',
  background: '#F2F2F2',
  padding: '20px',
  width: '100%',

} as React.CSSProperties)

export const signInButton = (width: number) => {
  const styles = {
    marginTop: '0.5rem',
    border: '1px solid rgb(203 213 225)',
    borderRadius: '0.5rem',
    padding: '12px 20px 12px 20px',
    backgroundColor: '#761AC7',
    color: '#FFFFFF',
    textDecoration: 'none',
    width: '100%',
    fontWeight: '600',
    cursor: 'pointer'
  }
  const sm = {
    marginTop: '.75rem',
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const walletOptionContainer = (width: number) => {
  const styles = {
    padding: '0px 24px 24px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px"
  }
  const sm = {
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const iconButton = (width: number, disabled: boolean = false, primary: boolean = false, noIcon: boolean = false) => {
  const styles = {
    textDecoration: "none",
    fontWeight: primary ? '500' : '400',
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: noIcon ? "center" : "space-between",
    alignItems: "center",
    padding: primary ? "20px 20px" : "16px 16px 16px 20px",
    width: "100%",
    background: primary ? (disabled ? "rgb(188 158 234)" : "#6D28D9") : "#F2F2F2",
    color: primary ? (disabled ? "#9376e8" : "white") : "black",
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: "16px",
    flex: "none",
    order: "0",
    flexGrow: "0",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)"
  }
  const sm = {
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const submitButtonContainer = () => (
  {
    padding: '0px 24px 24px'
  } as React.CSSProperties
)

export const learnMoreButton = (width: number) => {
  const styles = {
    padding: "4px 12px",
    background: "#F5EDFD",
    color: '#761AC7',
    fontSize: '12px',
    borderRadius: "20px",
    marginBottom: '16px'
  }
  const sm = {
  }

  return width < Breakpoints.sm
    ? (styles as React.CSSProperties)
    : ({ ...styles, ...sm } as React.CSSProperties)
}

export const loaderStyle = () =>
({
  display: 'flex',
  justifyContent: 'center',
  padding: '45px 0',
} as React.CSSProperties)

export const connectorWarning = () =>
({
  fontSize: 'small',
  textAlign: 'center',
  paddingTop: '6px',
} as React.CSSProperties)

export const browserExtensionSection = () =>
({
  paddingTop: '6px',
  fontSize: 'small',
  paddingLeft: '3px',
} as React.CSSProperties)

export const browserExtensionLink = () =>
({
  color: '#751ac7',
  textDecoration: 'underline',
  fontWeight: 400,
} as React.CSSProperties)

export const walletInstallExplanation = () =>
({
  marginTop: '6px',
  color: '#751ac7',
  width: '100%',
  fontSize: 'smaller',
  cursor: 'pointer'
} as React.CSSProperties)

export const walletExplanation = () =>
({
  padding: '6px 0',
  color: '#666',
  width: '100%',
  fontSize: 'smaller',
  marginBottom: '12px'
} as React.CSSProperties)