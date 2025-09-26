import { useState } from 'react';

function useFormSubmit(onSubmit, onSuccess, onError) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(); // função de chamada à API passada como argumento na chamada do hook
      if (onSuccess) onSuccess(); // se houver o argumento na chamada do hook, rode-o - no caso, handleClosePopup, que só roda se await for concluído com sucesso - onSuccess é o nome comum para este tipo de caso
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
}

export default useFormSubmit;
