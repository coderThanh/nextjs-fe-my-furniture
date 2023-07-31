import { menuList } from '@/services/apis/menu'
import { usePostAPI } from '@/services/hooks/hookAPI'

export const useMenuList = () => {
  const { data, loading, post: fetchMenu } = usePostAPI(menuList)
  return { data, loading, fetchMenu }
}
