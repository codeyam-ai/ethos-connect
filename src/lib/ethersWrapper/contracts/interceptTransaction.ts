import { PopulatedTransaction } from "ethers";
import { FunctionFragment } from "ethers/lib/utils";
import hideWallet from "lib/hideWallet";
import transact from "lib/transact";
import { Contract } from "./Contract";

import ContractInfo from '../../../contract';
import { UnpopulatedTransaction } from "types/UnpopulatedTransaction";

const interceptTransaction = async (contract: Contract, tx: PopulatedTransaction, fragment: FunctionFragment): Promise<boolean> => {
    console.log('==================');
    console.log('✍️ tx intercepted...');
    console.log('contract :>> ', contract);
    console.log('tx :>> ', tx);
    console.log('fragment :>> ', fragment);
    console.log('==================');

    if (fragment.stateMutability === 'payable') {
        const appId = 'coffee-demo'

        try {
            await transact({
                appId: appId,
                // Figure out how not to hard code
                network: 4,
                unpopulatedTransaction: tx,
                onSigned: () => console.log('📝 Signed!'),
                onComplete: async () => {
                    hideWallet(appId);
                    console.log('🎆 Mint complete!');
                }
            })
            console.log('intercepted transaction completed successfully');
            
        } catch (error) {
            console.log('intercepted transaction completed WITH ERROR');
            console.log(error);
        }
        return true;
    }
    return false;
}

export default interceptTransaction;