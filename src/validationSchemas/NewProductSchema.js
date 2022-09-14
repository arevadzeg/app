import * as Yup from 'yup';

export const NewProductSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, '* name should include 2 or more characters')
        .max(50, '* name too long')
        .required('* name is required'),
    description: Yup.string()
        .min(2, '* description should include 10 or more characters')
        .max(750, '* description too long')
        .required('* description is required'),
    price: Yup.number()
        .positive()
        .integer()
        .min(1, "price should be at least 1$")
        .required('* price is required'),
    auctionDate: Yup.date()
        .required('* Auction date is required'),
});