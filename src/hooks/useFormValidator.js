import { useRef, useEffect } from 'react';

import FormValidator from '@utils/FormValidator';

function useFormValidator(config) {
  const formRef = useRef(null);
  const validatorRef = useRef(null);

  // Cria a instância da validação
  useEffect(() => {
    if (formRef.current) {
      validatorRef.current = new FormValidator(config, formRef.current);
      validatorRef.current.enableValidation();
    }

    return () => {
      validatorRef.current = null;
    };
  }, [config]);

  return { formRef, validatorRef };
}

export default useFormValidator;
