import { supabase } from "@/utils/supabase";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import { ElMessage } from "element-plus";
import useScheduleStore from "@/stores/scheduleStore";

const useAdminStore = defineStore("adminStore", () => {
  const router = useRouter();

  const user = ref({
    email: "",
    password: "",
  });

  const currentUser = ref<any>(null);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.value.email,
        password: user.value.password,
      });

      if (error) throw error;

      currentUser.value = data.user;
      console.log("當前使用者:", currentUser.value);

      ElMessage.success("登入成功");

      // 清空登入表單
      user.value.password = "";

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error: any) {
      console.error("登入錯誤:", error.message);
      ElMessage.error(error.message || "帳號或密碼錯誤");
    }
  };

  const logout = async () => {
    try {
      // 呼叫 Supabase API 登出
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      currentUser.value = null;

      const scheduleStore = useScheduleStore();
      scheduleStore.resetData();

      router.push("/");

      ElMessage.success("已成功登出");
    } catch (error) {
      console.error("登出發生錯誤:", error);
      ElMessage.error("登出失敗");
    }
  };

  return {
    user,
    currentUser,
    handleLogin,
    logout,
  };
});

export default useAdminStore;
