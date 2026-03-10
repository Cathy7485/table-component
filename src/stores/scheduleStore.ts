import type { TPointList, TSchedule } from "@/types/schedule";
import { supabase } from "@/utils/supabase";

const useScheduleStore = defineStore("scheduleStore", () => {
  const isLoading = ref(true);

  // 排程資料
  const schedules = ref<TSchedule[]>([]);

  // 取得排程資料
  const fetchSchedules = async () => {
    isLoading.value = true;
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
      isLoading.value = false;
    } catch (error) {
      console.error("抓取資料失敗:", error);
    } finally {
      isLoading.value = false;
    }
  };

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

  return {
    schedules,
    fetchSchedules,
    pointsList,
    fetchPointOptions,
    addSchedule,
  };
});

export default useScheduleStore;
