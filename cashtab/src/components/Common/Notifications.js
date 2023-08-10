import * as React from 'react';
import { notification } from 'antd';
import {
    CashReceivedNotificationIcon,
    TokenReceivedNotificationIcon,
    ThemedUserProfileIcon,
} from 'components/Common/CustomIcons';
import Paragraph from 'antd/lib/typography/Paragraph';
import { currency } from 'components/Common/Ticker';
import { MessageSignedNotificationIcon } from 'components/Common/CustomIcons';
import { isMobile } from 'react-device-detect';
import { supportedFiatCurrencies } from 'config/cashtabSettings';

const getDeviceNotificationStyle = () => {
    if (isMobile) {
        const notificationStyle = {
            width: '100%',
            marginTop: '10%',
        };
        return notificationStyle;
    }
    if (!isMobile) {
        const notificationStyle = {
            width: '100%',
        };
        return notificationStyle;
    }
};

// Success Notifications:
const sendXecNotification = link => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'Success',
        description: (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <Paragraph>
                    Transaction successful. Click to view in block explorer.
                </Paragraph>
            </a>
        ),
        duration: currency.notificationDurationShort,
        icon: <CashReceivedNotificationIcon />,
        style: notificationStyle,
    });
};

const registerAliasNotification = (link, alias) => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'Success',
        description: (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <Paragraph>
                    Alias `{alias}` registration pending 1 confirmation.
                </Paragraph>
            </a>
        ),
        duration: currency.notificationDurationShort,
        icon: <ThemedUserProfileIcon />,
        style: notificationStyle,
    });
};

const createTokenNotification = link => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'Success',
        description: (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <Paragraph>
                    Token created! Click to view in block explorer.
                </Paragraph>
            </a>
        ),
        icon: <TokenReceivedNotificationIcon />,
        style: notificationStyle,
    });
};

const tokenIconSubmitSuccess = () => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'Success',
        description: (
            <Paragraph>Your eToken icon was successfully submitted.</Paragraph>
        ),
        icon: <TokenReceivedNotificationIcon />,
        style: notificationStyle,
    });
};

const sendTokenNotification = link => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'Success',
        description: (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <Paragraph>
                    Transaction successful. Click to view in block explorer.
                </Paragraph>
            </a>
        ),
        duration: currency.notificationDurationShort,
        icon: <TokenReceivedNotificationIcon />,
        style: notificationStyle,
    });
};

const burnTokenNotification = link => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'Success',
        description: (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <Paragraph>
                    eToken burn successful. Click to view in block explorer.
                </Paragraph>
            </a>
        ),
        duration: currency.notificationDurationLong,
        icon: <TokenReceivedNotificationIcon />,
        style: notificationStyle,
    });
};

const xecReceivedNotification = (
    balances,
    previousBalances,
    cashtabSettings,
    fiatPrice,
) => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'Transaction received',
        description: (
            <Paragraph>
                +{' '}
                {parseFloat(
                    Number(
                        balances.totalBalance - previousBalances.totalBalance,
                    ).toFixed(currency.cashDecimals),
                ).toLocaleString()}{' '}
                {currency.ticker}{' '}
                {cashtabSettings &&
                    cashtabSettings.fiatCurrency &&
                    `(${
                        supportedFiatCurrencies[cashtabSettings.fiatCurrency]
                            .symbol
                    }${(
                        Number(
                            balances.totalBalance -
                                previousBalances.totalBalance,
                        ) * fiatPrice
                    ).toFixed(
                        currency.cashDecimals,
                    )} ${cashtabSettings.fiatCurrency.toUpperCase()})`}
            </Paragraph>
        ),
        duration: currency.notificationDurationShort,
        icon: <CashReceivedNotificationIcon />,
        style: notificationStyle,
    });
};

const xecReceivedNotificationWebsocket = (
    xecAmount,
    cashtabSettings,
    fiatPrice,
) => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'eCash received',
        description: (
            <Paragraph>
                + {xecAmount.toLocaleString()} {currency.ticker}{' '}
                {cashtabSettings &&
                    cashtabSettings.fiatCurrency &&
                    `(${
                        supportedFiatCurrencies[cashtabSettings.fiatCurrency]
                            .symbol
                    }${(xecAmount * fiatPrice).toFixed(
                        currency.cashDecimals,
                    )} ${cashtabSettings.fiatCurrency.toUpperCase()})`}
            </Paragraph>
        ),
        duration: currency.notificationDurationShort,
        icon: <CashReceivedNotificationIcon />,
        style: notificationStyle,
    });
};

const eTokenReceivedNotification = (
    currency,
    receivedSlpTicker,
    receivedSlpQty,
    receivedSlpName,
) => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: `${currency.tokenTicker} transaction received: ${receivedSlpTicker}`,
        description: (
            <Paragraph>
                You received {receivedSlpQty.toString()} {receivedSlpName}
            </Paragraph>
        ),
        duration: currency.notificationDurationShort,
        icon: <TokenReceivedNotificationIcon />,
        style: notificationStyle,
    });
};

// Error Notification:

const errorNotification = (error, message, stringDescribingCallEvent) => {
    const notificationStyle = getDeviceNotificationStyle();
    console.log(error, message, stringDescribingCallEvent);
    notification.error({
        message: 'Error',
        description: message,
        duration: currency.notificationDurationLong,
        style: notificationStyle,
    });
};

const messageSignedNotification = msgSignature => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: 'Message Signature Generated',
        description: <Paragraph>{msgSignature}</Paragraph>,
        icon: <MessageSignedNotificationIcon />,
        style: notificationStyle,
    });
};

const generalNotification = (data, msgStr) => {
    const notificationStyle = getDeviceNotificationStyle();
    notification.success({
        message: msgStr,
        description: data,
        style: notificationStyle,
    });
};

export {
    sendXecNotification,
    registerAliasNotification,
    createTokenNotification,
    tokenIconSubmitSuccess,
    sendTokenNotification,
    xecReceivedNotification,
    xecReceivedNotificationWebsocket,
    eTokenReceivedNotification,
    errorNotification,
    messageSignedNotification,
    generalNotification,
    burnTokenNotification,
};
