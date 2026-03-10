import { supabase } from "@/utils/supabase";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import { ElMessage } from "element-plus";

const useAdminStore = defineStore("adminStore", () => {
  const router = useRouter();

  const user = ref({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await supabase.auth.signInWithPassword({
        email: user.value.email,
        password: user.value.password,
      });
      ElMessage.success("登入成功");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
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
