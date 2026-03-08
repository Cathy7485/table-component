const useLoadingStore = defineStore("loadingStore", () => {
  const isLoading = ref(false);

  const handleLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  return {
    isLoading,
    handleLoading,
  };
});

export default useLoadingStore;
