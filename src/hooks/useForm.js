import {useCallback, useEffect, useMemo} from 'react';

import {useForm as useReactHookForm} from 'react-hook-form';

const useForm = ({
  fields = [],
  onSubmit = () => false,
  defaultValue,
  shouldUnregister = false,
}) => {
  const initialValues = {};
  const defaultValueMemo = useMemo(
    () => defaultValue,
    [JSON.stringify(defaultValue)],
  );

  const checkFields = useCallback(
    (initial, cbItem, initialData = fields) => {
      function check(data, newData) {
        const instance = {
          data: newData,
        };
        data.forEach(item => {
          if ('fields' in item) {
            instance.data[item.id] = newData[item.id] || {};
            check(item.fields, instance.data[item.id]);
          } else {
            const itemValue = cbItem(item, instance.data[item.name]);
            if (itemValue !== null && itemValue !== undefined) {
              instance.data[item.name] = itemValue;
            }
          }
        });
      }
      check(initialData, initial);
      return initial;
    },
    [fields],
  );

  checkFields(initialValues, () => {
    return '';
  });

  const form = useReactHookForm({
    mode: 'onTouched',
    shouldUnregister,
  });

  const handleSubmit = form.handleSubmit(() => {
    const newValues = form.getValues();
    checkFields(newValues, (item, lastData) => {
      if (item.value) {
        return item.value(lastData);
      }
      return lastData;
    });
    onSubmit(newValues);
  });

  useEffect(() => {
    //console.log('default', defaultValue);
    Object.keys(defaultValue || {}).forEach(item => {
      if (item in initialValues && defaultValue && defaultValue[item]) {
        //console.log('item', item, defaultValue[item]);
        form.setValue(item, defaultValue[item], {shouldValidate: true});
      }
    });
  }, [defaultValueMemo]);

  return {form, handleSubmit};
};

export {useForm};
