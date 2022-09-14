import * as Yup from 'yup';

export const AutoBidSchema = Yup.object().shape({
    maxAmount: Yup.number('please enter a number')
        .required('* Maximum amount is required'),
    bidAlertNotification: Yup.number('please enter a number')
        .min(0, '* Bid alert notification can be from 0 to 100')
        .max(100, '* Bid alert notification can be from 0 to 100')
        .required('*  Bid alert notification required'),
});