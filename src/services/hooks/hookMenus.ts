import { menuList } from '@/services/apis/menu'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

export const useServerMenuList = () => {
  const { post: fetch } = useServerPostAPI(menuList)
  return { fetch }
}
