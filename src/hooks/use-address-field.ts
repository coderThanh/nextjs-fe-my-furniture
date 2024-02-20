import { useEffect, useState } from 'react'

const useAddressField = () => {
  const [provinceActive, setProvinceActive] = useState({ name: '', value: '' })
  const [districtActive, setDistrictActive] = useState({ name: '', value: '' })
  const [wardActive, setWardActive] = useState({ name: '', value: '' })
  const [provinceDepnend, setProvinceDepend] = useState([])
  const [districtDepnend, setDistrictDepend] = useState([])
  const [wardDepnend, setWardDepend] = useState([])

  // init
  useEffect(() => {
    fetchProvince()
  }, [])

  useEffect(() => {
    setDistrictActive({ name: '', value: '' })
    if (!provinceActive.value) return

    fetchDistrict(provinceActive.value)
  }, [provinceActive])

  useEffect(() => {
    setWardActive({ name: '', value: '' })
    setWardDepend([])

    if (!districtActive.value) return

    fetchWards(districtActive.value)
  }, [districtActive])

  // fetch
  const fetchProvince = async () => {
    await fetch(`/assets/vn-address/province.json`)
      .then((res) => res.json())
      .then(async (data) => {
        const preData = await data.map((item) => {
          const newItem = { ...item, value: item.matt }
          return newItem
        })

        const [result] = await Promise.all([preData])

        setProvinceDepend(result)
      })
  }

  const fetchDistrict = async (matt) => {
    if (!provinceActive.value) return

    setDistrictActive({ name: '', value: '' })

    const dataDistrictJSON = await fetch(
      `/assets/vn-address/district/${matt}.json`,
    )
      .then((res) => res.json())
      .then(async (data) => {
        const preData = await data.map((item) => {
          const newItem = { ...item, value: item.maqh }
          return newItem
        })

        const [result] = await Promise.all([preData])

        setDistrictDepend(result)
      })
  }

  const fetchWards = async (maqh) => {
    const dataDistrictJSON = fetch(`/assets/vn-address/wards/${maqh}.json`)
      .then((res) => res.json())
      .then(async (data) => {
        const preData = await data.map((item) => {
          const newItem = { ...item, value: item.mapx }
          return newItem
        })

        const [result] = await Promise.all([preData])

        setWardDepend(result)
      })
  }

  return {
    provinceActive,
    setProvinceActive,
    districtActive,
    setDistrictActive,
    wardActive,
    setWardActive,
    provinceDepnend,
    setProvinceDepend,
    districtDepnend,
    setDistrictDepend,
    wardDepnend,
    setWardDepend,
  }
}

export default useAddressField
