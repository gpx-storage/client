import { useState, useCallback } from 'react';

export default function useFormData(initialData: object) {
  const [data, setData] = useState(initialData);

  const onChangeHandler = useCallback((event: Event) => {
    const name = event.target?.name;
    if (name) {
      setData((oldData) => ({
        ...oldData,
        [name]: event.target?.value
      }))
    }
  }, [data]);

  return [data, onChangeHandler]
}