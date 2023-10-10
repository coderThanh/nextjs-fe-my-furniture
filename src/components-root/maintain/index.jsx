import AppAssets from '@/consts/assets'
import Image from 'next/image'

export default function MainTain() {
  return (
    <>
      <section className="404-area">
        <div className="container ">
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: ' 100vh' }}
          >
            <div className="col">
              <div className="text-center">
                <Image
                  src={AppAssets.imgLogoDark}
                  alt="logo Furmi"
                  priority={true}
                  width={100}
                  height={50}
                  style={{ objectFit: 'contain' }}
                />
                <p className="pb-150">
                  Website hiện đang bảo trì, Quý khách vui lòng quay lại sau!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
