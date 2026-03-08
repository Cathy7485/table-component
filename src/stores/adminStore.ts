import { supabase } from "@/utils/supabase";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import useLoadingStore from "@/stores/loadingStore.ts";

const useAdminStore = defineStore("adminStore", () => {
  const router = useRouter();

  const user = ref({
    email: "",
    password: "",
  });

  const loadingStore = useLoadingStore();
  const { handleLoading } = loadingStore;

  const handleLogin = async () => {
    try {
      await supabase.auth.signInWithPassword({
        email: user.value.email,
        password: user.value.password,
      });
      handleLoading(true); // 顯示loading
      router.push("/dashboard");
    } catch (error) {
      console.error("帳號或密碼錯誤");
      alert("帳號或密碼錯誤");
    }
  };

  return {
    user,
    handleLogin,
  };
});

export default useAdminStore;
