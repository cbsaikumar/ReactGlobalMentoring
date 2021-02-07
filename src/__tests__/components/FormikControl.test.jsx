import FormikControl from '../../components/FormikControl';

describe('FormikControl component', () => {
    it('Should render FormikControl', () => {
        const data = {
            control: 'date-picker',
            name: 'releaseDate',
            errors:{
                releaseDate: 'Enter valid date',
            }
        }
        expect(FormikControl(data)).toBeTruthy();
    })

    it('Should render FormikControl', () => {
        const data = {
            control: 'checkbox',
            name: 'genres',
            errors:{
                genres: 'select at least one genre',
            }
        }
        expect(FormikControl(data)).toBeTruthy();
    })

    it('Should render FormikControl', () => {
        const data = {
            control: 'default',
        }
        expect(FormikControl(data)).toBeFalsy();
    })
})