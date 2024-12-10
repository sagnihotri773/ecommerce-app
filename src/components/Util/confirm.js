import Confirmation, { Props as ConfimationProps } from './confermation';
import AlertConfirmation from './alertConfermation';
import { createConfirmation } from 'react-confirm';

export const confirm = createConfirmation(Confirmation);

export const alertComplex = createConfirmation(AlertConfirmation);
