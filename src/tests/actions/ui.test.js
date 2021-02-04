import { types } from '../../types/types';
import { setError, removeError, startLoading, finishLoading } from '../../actions/ui';

describe('Pruebas en ui-actions', () => {

    test('Todas las acciones deben de funcionar ', () => {

        const action = setError('Help');
        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'Help'
        });

        const removeErrorAction = removeError();
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });

        const startLoadingAction = startLoading();
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });

        const finishLoadingAction = finishLoading();
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });

    });

});