import BigNumber from 'bignumber.js';

export const newBN = (value: number | string) => new BigNumber(value);

export const sumBN = (balance: BigNumber | string | number, addition: BigNumber | string | number): BigNumber => {
    let bn = new BigNumber(balance.toString());
    let bnAddition = new BigNumber(addition.toString());
    return bn.plus(bnAddition);
};

export const formatBalance = (balance?: string | bigint | number, decimals: number = 9) => {
    if (balance === undefined) return '---';
    
    let postfix = '';
    let bn = new BigNumber(balance.toString()).shiftedBy(-1 * decimals);

    if (bn.gte(1_000_000_000)) {
        bn = bn.shiftedBy(-9);
        postfix = ' B';
    } else if (bn.gte(1_000_000)) {
        bn = bn.shiftedBy(-6);
        postfix = ' M';
    } else if (bn.gte(10_000)) {
        bn = bn.shiftedBy(-3);
        postfix = ' K';
    }

    if (bn.gte(1)) {
        bn = bn.decimalPlaces(3, BigNumber.ROUND_DOWN);
    } else {
        bn = bn.decimalPlaces(6, BigNumber.ROUND_DOWN);
    }

    return bn.toFormat() + postfix;
}