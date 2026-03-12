import type { TPointList, TSchedule } from "@/types/schedule";
import { supabase } from "@/utils/supabase";
import useLoadingStore from "@/stores/loadingStore";

const useScheduleStore = defineStore("scheduleStore", () => {
  const loadingStore = useLoadingStore();
  const { handleLoading } = loadingStore;

  // 點位資料
  const pointsList = ref<TPointList[]>([]);
  // 取得點位資料
  const fetchPointOptions = async () => {
    try {
      const { data, error } = await supabase
        .from("points")
        .select("id, point_name, point_type")
        .order("point_name");

      if (error) throw error;
      if (data) pointsList.value = data;
    } catch (error) {
      console.error("抓取點位選單失敗:", error);
    }
  };

  // 排程資料
  const schedules = ref<TSchedule[]>([]);

  // 取得排程資料
  const fetchSchedules = async () => {
    handleLoading(true);
    try {
      const { data, error } = await supabase
        .from("schedules") // 資料表名稱
        .select(
          `
          *,
          schedule_points (
            points ( 
              id, 
              point_name 
            )
          )
        `,
        )
        .order("id", { ascending: false });

      if (error) throw error;
      if (data) {
        schedules.value = data.map((item) => {
          return {
            ...item,
            schedule_points: item.schedule_points.map((point: any) => {
              return {
                id: point.points.id,
                point_name: point.points.point_name,
              };
            }),
          };
        });
      }
      handleLoading(false);
    } catch (error) {
      console.error("抓取資料失敗:", error);
    } finally {
      handleLoading(false);
    }
  };

  // 刪除排程資料
  const deleteSchedule = async (id: number) => {
    try {
      handleLoading(true);

      // 從 Supabase 刪除資料
      const { error } = await supabase.from("schedules").delete().eq("id", id); // 匹配 ID 進行刪除

      if (error) throw error;

      // 更新：直接從現有的 schedules 陣列中移除
      schedules.value = schedules.value.filter((item) => item.id !== id);

      return { success: true };
    } catch (error) {
      console.error("刪除失敗:", error);
      return { success: false, error };
    } finally {
      handleLoading(false);
    }
  };

  // 新增排程
  const addSchedule = async (formData: any, selectedPointIds: number[]) => {
    try {
      // 取得目前登入使用者
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 準備資料
      const payload = {
        ...formData,
        editor: user?.email || "unknown", // 紀錄登入者的 email 或 ID
        edit_time: new Date().toISOString(), // 加上當下時間
      };

      // 新增
      const { data: newSchedule, error: scheduleError } = await supabase
        .from("schedules")
        .insert([payload])
        .select()
        .single();

      if (scheduleError) throw scheduleError;

      // 處理points 關聯表 (schedule_points)
      if (newSchedule && selectedPointIds.length > 0) {
        const relationRows = selectedPointIds.map((pid) => ({
          schedule_id: newSchedule.id,
          point_id: pid,
        }));

        const { error: relationError } = await supabase
          .from("schedule_points")
          .insert(relationRows);

        if (relationError) throw relationError;
      }

      await fetchSchedules();
      return { success: true };
    } catch (error: any) {
      console.error("新增失敗:", error.message);
      return { success: false, error };
    }
  };

  // 編輯排程
  const updateSchedule = async (id: number, payload: any, selectedPointIds: number[]) => {
    try {
      handleLoading(true);

      // 更新主表 (schedules)
      const { error: scheduleError } = await supabase
        .from("schedules")
        .update(payload)
        .eq("id", id);

      if (scheduleError) throw scheduleError;

      // 處理點位關聯 (先刪除舊的，再新增新的)
      // 刪除該排程原本所有的關聯
      const { error: deleteError } = await supabase
        .from("schedule_points")
        .delete()
        .eq("schedule_id", id);

      if (deleteError) throw deleteError;

      // 插入新的關聯
      if (selectedPointIds.length > 0) {
        const relationRows = selectedPointIds.map((pid) => ({
          schedule_id: id,
          point_id: pid,
        }));

        const { error: insertError } = await supabase.from("schedule_points").insert(relationRows);

        if (insertError) throw insertError;
      }

      // 重新抓取資料
      await fetchSchedules();
      return { success: true };
    } catch (error) {
      console.error("更新失敗:", error);
      return { success: false, error };
    } finally {
      handleLoading(false);
    }
  };

  // 清除資料
  const resetData = () => {
    schedules.value = [];
    pointsList.value = [];
  };

  return {
    pointsList,
    fetchPointOptions,
    schedules,
    fetchSchedules,
    addSchedule,
    deleteSchedule,
    updateSchedule,
    resetData,
  };
});

export default useScheduleStore;
