
import { Preapproval } from "../types/Preapproval";

export type PreapprovalArgs = {
  signer: any,
  preapproval: Preapproval
}

const preapprove = async ({ signer, preapproval }: PreapprovalArgs) => {
  return signer.requestPreapproval(preapproval)
}

export default preapprove;