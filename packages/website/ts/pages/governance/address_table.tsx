import * as _ from 'lodash';
import * as React from 'react';
import styled from 'styled-components';

import { constants as sharedConstants } from '@0x/react-shared';
import { BigNumber } from '@0x/utils';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { constants } from 'ts/utils/constants';

import { ChangeEvent } from 'react';
import { AddressTableRow } from 'ts/pages/governance/address_table_row';

interface AddressTableProps {
    networkId: number;
    userAddresses: string[];
    addressBalances: BigNumber[];
    onSelectAddress?: (addressIndex: number) => void;
}

interface AddressTableState {
    selectedAddressIndex?: number;
}

interface RowProps {
    color: string;
    width: number;
}

export class AddressTable extends React.Component<AddressTableProps, AddressTableState> {
    constructor(props: AddressTableProps) {
        super(props);

        this.state = {
            selectedAddressIndex: 0,
        };
    }
    public render(): React.ReactNode {
        // const { userAddresses, addressBalances } = this.props;
        return (
            <Wrapper>
                <Table>
                    <tbody>{this._renderAddressTableRows()}</tbody>
                </Table>
            </Wrapper>
        );
    }
    private _renderAddressTableRows(): React.ReactNode {
        const { userAddresses, addressBalances } = this.props;
        const { selectedAddressIndex } = this.state;
        const rows = _.map(userAddresses, (userAddress: string, i: number) => {
            const balanceInZrx = addressBalances[i];
            const addressRowId = `address-${userAddress}`;
            const networkName = sharedConstants.NETWORK_NAME_BY_ID[this.props.networkId];
            // We specifically prefix kovan ETH.
            // TODO: We should probably add prefixes for all networks
            const isKovanNetwork = networkName === 'Kovan';
            const balanceInEth = Web3Wrapper.toUnitAmount(balanceInZrx, constants.DECIMAL_PLACES_ETH);
            const balanceString = `${balanceInEth.toString()} ${isKovanNetwork ? 'Kovan ' : ''}ZRX`;
            return (
                <AddressTableRow
                    key={addressRowId}
                    address={userAddress}
                    balance={balanceString}
                    isActive={selectedAddressIndex === i}
                    value={i}
                    onSelectAddress={this._onSelectAddress.bind(this)}
                />
            );
        });
        return rows;
    }
    private _onSelectAddress(e: ChangeEvent<HTMLInputElement>): void {
        const selectedAddressIndex = parseInt(e.currentTarget.value, 10);
        this.setState({ selectedAddressIndex });

        if (this.props.onSelectAddress) {
            this.props.onSelectAddress(selectedAddressIndex);
        }
    }
}
const Wrapper = styled.div<{ marginBottom?: string }>`
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: ${props => props.marginBottom || '25px'};
    padding: 10px 30px;
    height: 230px;
    overflow-y: auto;
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
`;
