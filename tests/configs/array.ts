import { Config, StateWithForms } from 'src/typings';
import { init } from '../../src/init';
import { printObj } from '../helpers/utils';

type TestState = {
    arrayField: {
        arrayField1: string,
        arrayField2: number,
    }[],
};

export const arrayConfig: Config<TestState> = {
    name: 'arrayForm',
    fields: {
        arrayField: {
            multiple: true,
            default: {
                arrayField1: {
                    value: '',
                    default: 'default',
                    rules: 'required',
                },
                arrayField2: {
                    type: 'number',
                    value: 10,
                    rules: 'required|min:18',
                },
            },
            fields: [{
                arrayField1: {},
                arrayField2: {},
            }],
        },
    },
};

export const arrayState: StateWithForms =  {
    arrayForm: {
        action: '',
        name: 'arrayForm',
        method: 'POST',
        fields: {
            arrayField: {
                key: 'arrayField',
                path: 'arrayField',
                focused: false,
                touched: false,
                changed: false,
                showErrors: false,
                extra: {},
                fieldType: 'ARRAY',
                default: {
                    arrayField1: {
                        key: 'arrayField1',
                        path: 'arrayField.arrayField1',
                        focused: false,
                        touched: false,
                        changed: false,
                        showErrors: false,
                        extra: {},
                        fieldType: 'SIMPLE',
                        value: '',
                        default: 'default',
                        initial: '',
                        rules: 'required',
                        name: 'arrayField1',
                        id: 'array-field-1',
                        type: 'text',
                        label: 'Array Field 1',
                        placeholder: 'Array Field 1',
                        disabled: false,
                        autoFocus: false,
                        autoComplete: 'arrayField1',
                        errors: [],
                    },
                    arrayField2: {
                        key: 'arrayField2',
                        path: 'arrayField.arrayField2',
                        focused: false,
                        touched: false,
                        changed: false,
                        showErrors: false,
                        extra: {},
                        fieldType: 'SIMPLE',
                        value: 10,
                        default: '',
                        initial: 10,
                        rules: 'required|min:18',
                        name: 'arrayField2',
                        id: 'array-field-2',
                        type: 'number',
                        label: 'Array Field 2',
                        placeholder: 'Array Field 2',
                        disabled: false,
                        autoFocus: false,
                        autoComplete: 'arrayField2',
                        errors: [],
                    },
                },
                fields: [
                    {
                        arrayField1: {
                            key: '[0].arrayField1',
                            path: 'arrayField[0].arrayField1',
                            focused: false,
                            touched: false,
                            changed: false,
                            showErrors: false,
                            extra: {},
                            fieldType: 'SIMPLE',
                            value: '',
                            default: 'default',
                            initial: '',
                            rules: 'required',
                            name: 'arrayField[][arrayField1]',
                            id: 'array-field-1-0',
                            type: 'text',
                            label: 'Array Field 1',
                            placeholder: 'Array Field 1',
                            disabled: false,
                            autoFocus: false,
                            autoComplete: 'arrayField1',
                            errors: [
                                'The array field 1 field is required.',
                            ],
                        },
                        arrayField2: {
                            key: '[0].arrayField2',
                            path: 'arrayField[0].arrayField2',
                            focused: false,
                            touched: false,
                            changed: false,
                            showErrors: false,
                            extra: {},
                            fieldType: 'SIMPLE',
                            value: 10,
                            default: '',
                            initial: 10,
                            rules: 'required|min:18',
                            name: 'arrayField[][arrayField2]',
                            id: 'array-field-2-0',
                            type: 'number',
                            label: 'Array Field 2',
                            placeholder: 'Array Field 2',
                            disabled: false,
                            autoFocus: false,
                            autoComplete: 'arrayField2',
                            errors: [
                                'The array field 2 must be at least 18.',
                            ],
                        },
                    },
                ],
            },
        },
        isAsync: false,
        extra: {},
    },
};
