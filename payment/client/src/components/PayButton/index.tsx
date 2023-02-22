import { FC, useState } from 'react';
import { usePayPalHostedFields } from '@paypal/react-paypal-js';

import styles from './style.module.scss';

interface Props{
    onApprove: (orderId: string) => Promise<void>;
}

const PayButton: FC<Props> = (props) => {
    const { onApprove } = props;

    const [paying, setPaying] = useState<boolean>(false);

    const hostedFields = usePayPalHostedFields();
    
    const submitHandler = async () => {
        if (typeof hostedFields.cardFields?.submit !== 'function')
            return;
        
        setPaying(true);

        const order = await hostedFields.cardFields?.submit({ cardholderName: "James Robbins" })

        await onApprove(order.orderId);

        setPaying(false);
    };

    return (
        <button className={styles.button} onClick={submitHandler}>
            {paying ? 'Paying...' : 'Pay'}
        </button>
    );
}

export default PayButton;